import smtplib
import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

CORREO_ORIGEN  = "englishwork773@gmail.com"
CORREO_DESTINO = "frankbriseo@yahoo.com"
PASSWORD       = "bljkjyxjjvshmzxn"

def send_email(nombre, correo_cliente, telefono, servicio, mensaje):
    cuerpo = f"""Nuevo mensaje desde English@Work

Nombre:   {nombre}
Correo:   {correo_cliente}
Teléfono: {telefono}
Servicio: {servicio}

Mensaje:
{mensaje}
"""
    try:
        msg = MIMEMultipart()
        msg['From']    = CORREO_ORIGEN
        msg['To']      = CORREO_DESTINO
        msg['Subject'] = f"Nuevo contacto: {nombre} — {servicio}"
        msg.attach(MIMEText(cuerpo, 'plain', 'utf-8'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(CORREO_ORIGEN, PASSWORD)
        server.sendmail(CORREO_ORIGEN, CORREO_DESTINO, msg.as_string())
        server.quit()
        return True

    except Exception as err:
        print(f"Error al enviar correo: {err}")
        return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacto', methods=['POST'])
def contacto():
    data     = request.get_json()
    nombre   = data.get('nombre', '')
    correo   = data.get('correo', '')
    telefono = data.get('telefono', '')
    servicio = data.get('servicio', '')
    mensaje  = data.get('mensaje', '')

    ok = send_email(nombre, correo, telefono, servicio, mensaje)

    if ok:
        return jsonify({'status': 'ok', 'mensaje': '¡Mensaje enviado! Frank te contactará pronto.'})
    else:
        return jsonify({'status': 'error', 'mensaje': 'Hubo un error al enviar. Escríbenos a frankbriseo@yahoo.com'}), 500

if __name__ == '__main__':
    app.run(debug=True)
