#!/usr/bin/env python3
import os
import smtplib
import subprocess
from email.mime.text import MIMEText
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

EMAIL_FROM = os.getenv("EMAIL_FROM")
EMAIL_TO = os.getenv("EMAIL_TO")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))

def run_git(args):
    return subprocess.run(["git"] + args, capture_output=True, text=True).stdout.strip()

def get_commit_info():
    commit = run_git(["log", "-1", "--pretty=format:%H%n%an%n%s"])
    lines = commit.split("\n")
    return {
        "hash": lines[0] if len(lines) > 0 else "N/A",
        "author": lines[1] if len(lines) > 1 else "N/A",
        "message": lines[2] if len(lines) > 2 else "N/A"
    }

def get_branch():
    return run_git(["branch", "--show-current"])

def get_origin():
    return run_git(["remote", "get-url", "origin"])

def get_changed_files():
    return run_git(["status", "--short"])

def send_email():
    info = get_commit_info()
    branch = get_branch()
    origin = get_origin()
    files = get_changed_files()
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")

    commit_url = f"{origin}/commit/{info['hash']}" if origin != "N/A" else "N/A"
    rollback_cmd = f"git revert {info['hash']}" if info['hash'] != "N/A" else "git reset --hard HEAD~1"

    body = f"""🔔 Reporte de Cambios - Divina Misericordia

📋 INFORMACIÓN
• Fecha: {now}
• Repositorio: {origin}
• Rama: {branch}
• Commit: {info['hash']}
• Autor: {info['author']}

📝 MENSAJE
{info['message']}

📂 ARCHIVOS MODIFICADOS
{files if files else "Sin cambios pendientes"}

🔗 ENLACE
{commit_url}

⏪ REVERTIR
{rollback_cmd}

Mensaje automático - Divina Misericordia App
"""

    msg = MIMEText(body)
    msg["Subject"] = f"[Divina Misericordia] {branch} - {info['hash'][:8]}"
    msg["From"] = EMAIL_FROM
    msg["To"] = EMAIL_TO

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_FROM, EMAIL_PASSWORD)
            server.send_message(msg)
        print("Correo enviado")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if not all([EMAIL_FROM, EMAIL_TO, EMAIL_PASSWORD]):
        print("Faltan variables en .env")
    else:
        send_email()
