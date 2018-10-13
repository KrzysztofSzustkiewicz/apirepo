import database_connection

@database_connection.connection_handler
def user_add(cursor, username, password):
    cursor.execute("""
                        INSERT INTO users_api (username, password)
                        VALUES (%(username)s, %(password)s)
                        """, {'username': username, 'password': password})

@database_connection.connection_handler
def get_all_usernames(cursor):
    cursor.execute("""
                    SELECT username
                    FROM users_api
                    """)
    usernames_dict = cursor.fetchall()
    usernames_list = []
    for username in usernames_dict:
        usernames_list.append(username['username'])
    return usernames_list


@database_connection.connection_handler
def get_password_by_username(cursor, username):
    cursor.execute("""
                    SELECT password
                    FROM users_api
                    WHERE username = %(username)s
                    """, {'username': username})
    password = cursor.fetchall()
    return password[0]['password']

