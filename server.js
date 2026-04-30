import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import git from 'simple-git';
import { spawn, exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gitRepo = git(__dirname);
const LOG_FILE = path.join(__dirname, 'logs', 'admin-changes.log');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'sacra';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Rufi14';

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'divina-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false }
}));

app.use(express.static('.'));

function requireAuth(req, res, next) {
  if (req.session.admin) return next();
  res.status(401).json({ error: 'No autorizado' });
}

app.post('/api/admin/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
    req.session.admin = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ error: 'Credenciales inválidas' });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/admin/session', (req, res) => {
  res.json({ logged: !!req.session.admin });
});

app.post('/api/save', requireAuth, async (req, res) => {
  const { page, content } = req.body;
  if (!page) return res.status(400).json({ error: 'Pagina requerida' });

  const now = new Date();
  const ts = now.toISOString().replace(/[-:]/g, '').split('.')[0].replace('T', '-');
  const backupDir = path.join(__dirname, 'backups');
  const backupFile = path.join(backupDir, `${ts}-${path.basename(page)}`);

  try {
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    if (fs.existsSync(path.join(__dirname, page))) {
      fs.copyFileSync(path.join(__dirname, page), backupFile);
    }

    fs.writeFileSync(path.join(__dirname, page), content, 'utf8');

    const logEntry = `${now.toISOString()} | admin | ${page} | backup: ${backupFile}\n`;
    if (!fs.existsSync(path.join(__dirname, 'logs'))) fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });
    fs.appendFileSync(LOG_FILE, logEntry);

    try {
      await gitRepo.raw(['add', '-f', page, 'backups/', 'logs/']);
      await gitRepo.commit(`fix: actualizar ${page} desde admin`);
      await gitRepo.addTag(`restore-${ts}`);
    } catch (gitErr) {
      fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT ERROR: ${gitErr.message}\n`);
    }

    res.json({ ok: true, backup: backupFile });

    const emailProc = spawn('python', [path.join(__dirname, 'scripts', 'send_email_report.py')], {
      detached: true, stdio: 'ignore'
    });
    emailProc.unref();
    emailProc.on('error', (err) => {
      fs.appendFileSync(LOG_FILE, `${now.toISOString()} | EMAIL ERROR: ${err.message}\n`);
    });
  } catch (err) {
    res.status(500).json({ error: 'Error guardando', detail: err.message });
  }
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
