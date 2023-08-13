#core/auth/serializers/register.py
from rest_framework import serializers
from core.user.serializers import UserSerializer
from core.user.models import User

class RegisterSerializer(UserSerializer):
    """Register serializer for requests and user 
    creation"""
    # Making sure the passowed is at least 8 charecters 
    # long, and no longer than 128 and can't be read by
    # the user
    password = serializers.CharField(max_length = 128,
                                        min_length = 8,
                                        write_only = True,
                                        required = True)
    
    #This function is called by RegisterViewSet.
    #at user = serializer.save()
    def create(self, validated_data):
        # Use the `create_user` method we worte earlier
        # for the UserManager to create a new user.
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = [
            'id',
            'bio',
            'avatar',
            'email',
            'username',
            'first_name',
            'last_name',
            'password'
        ]

