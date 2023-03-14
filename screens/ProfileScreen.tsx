import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Box,
  VStack,
  Avatar,
  Center,
  Text,
  HStack,
  Button,
  ScrollView,
} from 'native-base';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import { PostCard } from '../components/posts/PostCard';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { authData, signOut } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);

  const [tab, setTab] = useState<string>('posts');

  const getPosts = async () => {
    const response = await axios.get('/me/posts');
    setPosts(await response.data?.posts);
  };

  const getLikedPosts = async () => {
    const response = await axios.get('/me/likes');
    setLikedPosts(await response.data?.likes);
  };

  useEffect(() => {
    getPosts();
    getLikedPosts();
  }, []);

  return (
    <Box
      paddingTop={Platform.OS === 'android' ? insets.top : 0}
      paddingBottom={Platform.OS === 'android' ? insets.bottom : 0}
      paddingLeft={Platform.OS === 'android' ? insets.left : 0}
      paddingRight={Platform.OS === 'android' ? insets.right : 0}
    >
      <Box mx={5} mt={10}>
        <Button mb={5} onPress={signOut}>
          Logout
        </Button>

        <HStack space={8} justifyContent={'center'} alignItems={'center'}>
          <Avatar
            size={'xl'}
            bg={'gray.300'}
            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5446f93de4b0a3452dfaf5b0/1626904421257-T6I5V5IQ4GI2SJ8EU82M/Above+Avalon+Neil+Cybart?format=500w',
            }}
          />

          <HStack space={8} alignItems={'center'}>
            <Box>
              <Text fontSize={'lg'} fontWeight={'black'} textAlign={'center'}>
                {authData?.user?.followees_count}
              </Text>
              <Text textAlign={'center'}>Following</Text>
            </Box>

            <Box>
              <Text fontSize={'lg'} fontWeight={'black'} textAlign={'center'}>
                {authData?.user?.followers_count}
              </Text>
              <Text textAlign={'center'}>Followers</Text>
            </Box>

            <Box>
              <Text fontSize={'lg'} fontWeight={'black'} textAlign={'center'}>
                {authData?.user?.all_likes_count}
              </Text>
              <Text textAlign={'center'}>Likes</Text>
            </Box>
          </HStack>
        </HStack>

        <Box mt={3} textAlign={'start'}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            {authData?.user?.name}
          </Text>
          <Text>Lorem, ipsum dolor sit amet consectetur.</Text>
        </Box>

        <Center mt={10}>
          <Button.Group size={'sm'} isAttached colorScheme={'gray'}>
            <Button
              w={'1/2'}
              variant={tab === 'posts' ? 'solid' : 'outline'}
              onPress={() => setTab('posts')}
            >
              Posts
            </Button>
            <Button
              w={'1/2'}
              variant={tab === 'likes' ? 'solid' : 'outline'}
              onPress={() => setTab('likes')}
            >
              Likes
            </Button>
          </Button.Group>
        </Center>

        <Box mt={5}>
          {tab === 'posts' ? (
            <ScrollView>
              <VStack>
                {posts.length === 0 && (
                  <Text textAlign={'center'}>No posts yet</Text>
                )}

                {posts.map((post, idx) => (
                  <PostCard
                    key={'my-post-' + idx}
                    post={post}
                    refreshPosts={getPosts}
                  />
                ))}
              </VStack>
            </ScrollView>
          ) : (
            <ScrollView>
              <VStack>
                {likedPosts.length === 0 && (
                  <Text textAlign={'center'}>No liked posts yet</Text>
                )}

                {likedPosts.map((post, idx) => (
                  <Box key={'liked-post-' + idx}>
                    <HStack alignItems={'center'} my={2}>
                      <Avatar
                        w={30}
                        h={30}
                        source={{
                          uri: post.creator.image
                            ? 'http://192.168.1.14:3000/api' +
                              post.creator.image
                            : 'https://picsum.photos/200',
                        }}
                      />
                      <Text ml={3} fontSize={'lg'}>
                        {post.creator.name}
                      </Text>
                    </HStack>
                    <PostCard post={post} refreshPosts={getLikedPosts} />
                  </Box>
                ))}
              </VStack>
            </ScrollView>
          )}
        </Box>
      </Box>
    </Box>
  );
}
