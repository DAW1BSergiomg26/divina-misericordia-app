import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { spawn, exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'src', 'public');
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
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

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

  if (!page) {
    return res.status(400).json({ error: 'Página requerida' });
  }

  if (typeof content !== 'string') {
    return res.status(400).json({ error: 'Contenido inválido' });
  }

  const safePage = path.basename(page);
    const targetFile = path.join(PUBLIC_DIR, safePage);

  const now = new Date();
  const ts = now.toISOString().replace(/[-:]/g, '').split('.')[0].replace('T', '-');

  const backupDir = path.join(__dirname, 'backups');
  const logsDir = path.join(__dirname, 'logs');
  const backupFile = path.join(backupDir, `${ts}-${safePage}`);

  try {
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    const relativePage = `src/public/${safePage}`;

    if (fs.existsSync(targetFile)) {
      fs.copyFileSync(targetFile, backupFile);
    }

    fs.writeFileSync(path.join(__dirname, relativePage), content, 'utf8');

    const logEntry = `${now.toISOString()} | admin | ${safePage} | backup: ${backupFile}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);

    try {
      const gitAdd = `git add -f "${relativePage}" "backups/" "logs/admin-changes.log"`;
      fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT CMD: ${gitAdd}\n`);

      await new Promise((resolve) => {
        exec(gitAdd, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT ADD ERROR: ${err.message} | stderr: ${stderr}\n`);
          } else {
            fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT ADD OK: ${stdout}\n`);
          }
          resolve();
        });
      });

      const gitCommit = `git commit -m "fix: actualizar ${safePage} desde admin"`;
      fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT CMD: ${gitCommit}\n`);

      let commitCreated = false;

      await new Promise((resolve) => {
        exec(gitCommit, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT COMMIT ERROR: ${err.message} | stderr: ${stderr}\n`);
          } else {
            commitCreated = true;
            fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT COMMIT OK: ${stdout}\n`);
          }
          resolve();
        });
      });

      if (commitCreated) {
        const gitTag = `git tag restore-${ts}`;
        fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT CMD: ${gitTag}\n`);

        await new Promise((resolve) => {
          exec(gitTag, { cwd: __dirname }, (err, stdout, stderr) => {
            if (err) {
              fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT TAG ERROR: ${err.message} | stderr: ${stderr}\n`);
            } else {
              fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT TAG OK: ${stdout}\n`);
            }
            resolve();
          });
        });
      }
    } catch (gitErr) {
      fs.appendFileSync(LOG_FILE, `${now.toISOString()} | GIT ERROR: ${gitErr.message}\n`);
    }

    res.json({ ok: true, backup: backupFile });

    const emailProc = spawn('python', [path.join(__dirname, 'scripts', 'send_email_report.py')], {
      detached: true,
      stdio: 'ignore'
    });

    emailProc.unref();

    emailProc.on('error', (err) => {
      fs.appendFileSync(LOG_FILE, `${now.toISOString()} | EMAIL ERROR: ${err.message}\n`);
    });
  } catch (err) {
    res.status(500).json({ error: 'Error guardando', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});