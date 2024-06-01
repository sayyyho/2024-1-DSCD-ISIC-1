from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileSerializer

class ProfileViewSet(viewsets.ViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        # 사용자 정보가 이미 등록된 경우
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = self.serializer_class(profile)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # 사용자 정보가 등록되어있지 않은 경우
        except Profile.DoesNotExist:
            return Response({"error": "No contents."}, status=status.HTTP_204_NO_CONTENT)

    def create(self, request):
        # 사용자 정보가 이미 등록된 경우
        if Profile.objects.filter(user=request.user).exists():
            return Response({"error": "Profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data.copy()
        data['user'] = request.user.id  # request.user.id를 통해 현재 로그인한 사용자를 설정
        serializer = self.serializer_class(data=data)
                
        # 사용자 정보 새로 등록
        if serializer.is_valid():
            serializer.save(user=request.user)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request):
        # 사용자 정보 수정
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = self.serializer_class(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # 사용자 정보가 없는 경우
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
