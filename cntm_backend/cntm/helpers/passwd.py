
from passlib.hash import pbkdf2_sha256, md5_crypt

def hash_password(passwd):
    hash = pbkdf2_sha256.encrypt(passwd, rounds=20, salt_size=16)
    return hash

def verify_passwd(passwd, hash):
    return pbkdf2_sha256.verify(passwd, hash)

def md5_hash(inpt):
    return md5_crypt.encrypt(inpt, salt_size=0)
