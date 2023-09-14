from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)

medicalTrack = {
    'fever':'7',
    'cough':'7',
    'diabetes':'24',
    'pressure':'24'
}

# Configure the upload folder
UPLOAD_FOLDER = './static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

prescriptionPath = './static/prescriptions/'

# Allowed image extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check if a filename has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    # render the main file
    return render_template('home.html')



@app.route('/list')
def index():
    # Get a list of uploaded images
    uploaded_images = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('index.html', images=uploaded_images)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)

    file = request.files['file']

    if file.filename == '':
        return redirect(request.url)

    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return redirect(url_for('index'))

@app.route('/prescription', methods=['GET'])
def prescribe():
#    presc_inp = os.listdir(prescriptionPath)
#    presc = presc_inp
    return render_template('prescing.html')


@app.route('/track', methods=['GET'])
def medTrack():
    userDis = request.args.get('userDisHt')
    userMed = request.args.get('userMedHt')
    googleDis = "https://google.com/search?q=treating "+userDis+" while using "+userMed
    if userDis in medicalTrack:
        return render_template('track.html', userDis=userDis, userDisDays=medicalTrack[userDis], googleDis=googleDis)
    else:
        return render_template('track.html', userDis=userDis, userDisDays="Few", googleDis=googleDis)

if __name__ == '__main__':
    app.run(debug=True)
