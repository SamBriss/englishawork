# English@Work – Landing Page

Landing page profesional para English@Work, construida con Flask + HTML/CSS/JS.

## Instalación rápida

```bash
cd EnglishAtWork
pip install -r requirements.txt
python app.py
```

Abre tu navegador en: http://localhost:5000

## Estructura

```
EnglishAtWork/
├── app.py               # Servidor Flask
├── requirements.txt
├── static/
│   ├── style.css
│   ├── script.js
│   └── img/             # Agrega aquí logo.png y otras imágenes
└── templates/
    └── index.html
```

## Personalización

- **Teléfono / WhatsApp**: Busca `6640000000` en `index.html` y reemplaza con tu número real
- **Correo**: Busca `contacto@englishatwork.com` y actualiza
- **Dirección**: Actualiza en la sección de contacto
- **Redes sociales**: Actualiza los `href="#"` del footer con tus URLs reales
- **Logo**: Coloca tu `logo.png` en `static/img/` y actualiza el navbar

## Despliegue

### Render (gratis)
1. Sube el proyecto a GitHub
2. Crea cuenta en render.com
3. New Web Service → conecta tu repo
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn app:app`

### Railway
1. Sube a GitHub
2. railway.app → New Project → Deploy from GitHub

### PythonAnywhere
1. Sube los archivos
2. Configura WSGI apuntando a `app.py`

## Próximas mejoras sugeridas
- [ ] Conectar formulario a correo (Flask-Mail)
- [ ] Agregar sección de testimonios
- [ ] Agregar preguntas frecuentes (FAQ)
- [ ] Calendario para agendar clases
- [ ] Blog
- [ ] Panel administrador
