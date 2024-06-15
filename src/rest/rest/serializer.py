from rest_framework import serializers

class TodoSerializer(serializers.Serializer):
    todo = serializers.CharField(max_length=200)
