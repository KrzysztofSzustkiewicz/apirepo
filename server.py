from flask import Flask, render_template, url_for, session, escape, request, redirect, jsonify, make_response
import data_validations


app = Flask(__name__)
app.secret_key = '##fgjs82/83?GD>H#$g%'


@app.route('/')
def index_display():
    return render_template('index.html')


@app.route('/status')
def login_status():
    if 'username' in session:
        username = '%s' % escape(session['username'])
        data = {'logged': 'Logged', 'username': username}
        return jsonify(data)
    else:
        data = {'logged': 'Not Logged'}
        return  jsonify(data)


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        if data_validations.user_information_validation(username, password):
            session['username'] = username
            return jsonify('Accepted')
        else:
            return jsonify('dupa')
    return jsonify('kupa')


@app.route('/register', methods=['POST'])
def user_registration():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        try:
            data_validations.new_user_add(username, password)
            return redirect(url_for('index_display'))
        except KeyError:
            return redirect(url_for('index_display'))
    else:
        return redirect(url_for('index_display'))


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index_display'))


if __name__ == '__main__':
    app.run(debug=True)