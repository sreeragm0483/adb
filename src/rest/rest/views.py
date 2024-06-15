from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from .serializer import TodoSerializer

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
client = MongoClient(mongo_uri)
db = client['test_db']
collection = db['todo']

class TodoListView(APIView):

    def get(self, request):
        todos = list(collection.find())
        for todo in todos:
            todo['_id'] = str(todo['_id'])
        return Response(todos, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            todo = request.data.get("todo")
            data = {"todo": todo}
            result = collection.insert_one(data)  
            todos = list(collection.find({}, {'_id': False, 'todo': True}))
            return Response({"_id": str(result.inserted_id), "todos": todos}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)