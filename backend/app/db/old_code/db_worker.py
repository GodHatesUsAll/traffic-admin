import MySQLdb
import os
import json


class DBWorker:
    __db_host = os.environ['MYSQL_HOST']
    __db_username = os.environ['MYSQL_USERNAME']
    __db_name = os.environ['MYSQL_DB']
    __db_password = os.environ['MYSQL_PASSWORD']
    __connection: any
    __db: any

    # def __init__(self):

    def connect_to_db(self):
        self.__connection = MySQLdb.connect(
            host=self.__db_host,
            user=self.__db_username,
            passwd=self.__db_password,
            db=self.__db_name)
        self.__connection.ping(True)
        self.__db = self.__connection.cursor()
        print('connection opened')

    def find_all(self, query_string):
        self.connect_to_db()
        db = self.__db
        db.execute(query_string)

        row_headers = [x[0] for x in db.description]  # this will extract row headers
        result = db.fetchall()
        db.close()

        json_data = []

        for r in result:
            json_data.append(dict(zip(row_headers, r)))
        print('connection closed')

        return json.dumps(json_data)
