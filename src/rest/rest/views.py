from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]

db = MongoClient(mongo_uri)['test_db']
collection = db['todoCollection']

class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        myresults = collection.find()
        data = []
        for item in myresults:
            data.append(item["todo"])
       
        return Response(data, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        data = request.data
        if not data["todo"]:
            return Response(data, status=status)
        else:
            data = collection.insert_one(data)
            return Response(data, status=status.HTTP_200_OK)
