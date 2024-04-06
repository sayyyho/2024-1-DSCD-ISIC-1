from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # 비밀번호는 response에 포함 x

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_number']

class CustomTokenObtainPairSerializer(serializers.Serializer): # jwt 인증을 위한 serializer
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                token_data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }
                return token_data
            raise serializers.ValidationError("해당하는 사용자 정보가 없습니다.")
        else:
            raise serializers.ValidationError("아이디와 비밀번호를 모두 입력해주세요.")
