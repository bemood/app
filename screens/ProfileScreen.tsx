import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, VStack, Heading, Image, Avatar, Flex, Center, Text, HStack, Divider, Button, Spacer } from 'native-base'
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import {Platform} from "react-native";
import moment from "moment";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { authData } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);

  const [tab, setTab] = useState<string>("posts");

  const getPosts = async () => {
    const response = await axios.get('/me/posts');
    setPosts(await response.data?.posts);
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <Box
      paddingTop={Platform.OS === 'android' ? insets.top : 0}
      paddingBottom={Platform.OS === 'android' ? insets.bottom : 0}
      paddingLeft={Platform.OS === 'android' ? insets.left : 0}
      paddingRight={Platform.OS === 'android' ? insets.right : 0}
    >
      <Box mx={5} mt={10}>
        <HStack space={8} justifyContent={"center"} alignItems={"center"}>
          <Avatar size={"xl"} bg={"gray.300"} source={{
            uri: "https://images.squarespace-cdn.com/content/v1/5446f93de4b0a3452dfaf5b0/1626904421257-T6I5V5IQ4GI2SJ8EU82M/Above+Avalon+Neil+Cybart?format=500w"
          }}/>

          <HStack space={8} alignItems={"center"}>
            <Box>
              <Text fontSize={"lg"} fontWeight={"black"} textAlign={"center"}>
                {authData?.user?.followees_count}
              </Text>
              <Text textAlign={"center"}>
                Following
              </Text>
            </Box>

            <Box>
              <Text fontSize={"lg"} fontWeight={"black"} textAlign={"center"}>
                {authData?.user?.followers_count}
              </Text>
              <Text textAlign={"center"}>
                Followers
              </Text>
            </Box>

            <Box>
              <Text fontSize={"lg"} fontWeight={"black"} textAlign={"center"}>
                {authData?.user?.all_likes_count}
              </Text>
              <Text textAlign={"center"}>
                Likes
              </Text>
            </Box>
          </HStack>
        </HStack>

        <Box mt={3} textAlign={"start"}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>{authData?.user?.name}</Text>
          <Text>
            Lorem, ipsum dolor sit amet consectetur.
          </Text>
        </Box>

        <Center mt={10}>
          <Button.Group size={"sm"} isAttached colorScheme={"gray"}>
            <Button 
              w={"1/2"}
              variant={tab === 'posts' ? "solid" : "outline"}
              onPress={() => setTab("posts")}
            >
              Posts
            </Button>
            <Button
              w={"1/2"}
              variant={tab === 'likes' ? "solid" : "outline"}
              onPress={() => setTab("likes")}
            >
              Likes
            </Button>
          </Button.Group>
        </Center>

        <Box mt={5}>
          {tab === "posts" ? (
            <>
              <VStack>
                {posts.map((post, idx) => (
                  <Box key={idx} rounded={"lg"} my={3} h={100} backgroundColor={"gray.200"}>
                    <HStack>
                      <Image
                        roundedTopLeft={"lg"}
                        roundedBottomLeft={"lg"}
                        w={100}
                        h={100}
                        alt="music image" 
                        source={{ 
                          uri: post.music?.music?.image,
                        }}
                      />
                      <VStack mx={3} flex={1} justifyContent={"space-between"}>
                        <HStack w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                          <Text fontSize={"lg"} fontWeight={"bold"}>{post.music?.music?.name}</Text>
                          <Text>(4:03)</Text>
                        </HStack>
                        <Box>
                          <Text>{post.music?.music?.artist}</Text>
                        </Box>
                        <Box>
                          <Text>{post.mood?.emojie}</Text>
                        </Box>
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                          <Text>Posted on {moment(post.created_at).format('D MMMM')}</Text>
                          <Text>{post.like_count} 🤍</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </>
          ) : (
            <Text>Likes</Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}