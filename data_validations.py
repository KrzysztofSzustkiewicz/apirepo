import data_manager
from werkzeug.security import generate_password_hash, check_password_hash


def new_user_add(username, password):
    users_list = data_manager.get_all_usernames()
    if username not in users_list and length_validation(username, 5) and length_validation(password, 5):
        fixed_username = username.lower()
        fixed_password = generate_password_hash(password)
        try:
            print(fixed_username, fixed_password)
            data_manager.user_add(fixed_username, fixed_password)
        except:
            raise ValueError
    else:
        raise KeyError


def user_information_validation(username, password):
    users_list = data_manager.get_all_usernames()
    username_requested = username.lower()
    if username_requested in users_list:
        user_password = data_manager.get_password_by_username(username_requested)
        if check_password_hash(user_password, password):
            return True
        else:
            return False
    else:
        return False


def length_validation(string, len_min):
    return len(string) >= len_min


