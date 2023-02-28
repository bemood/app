import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, VStack, Heading, Image, Avatar, Flex, Center, Text, HStack, Divider, Button, Spacer } from 'native-base'
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const posts = [
  { name: 'Post 1', likes: 10 },
  { name: 'Post 2', likes: 10 },
]

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { authData } = useAuth();
  // const [posts, setPosts] = useState<any[]>([]);

  console.log(authData)

  const [tab, setTab] = useState<string>("posts");

  // const getPosts = async () => {
  //   const response = await axios.get('/me/posts');
  //   setPosts(await response.data?.posts);
  // }

  // useEffect(() => {
  //   getPosts();
  // }, [])

  return (
    <Box
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      <Box mx={10} mt={10}>
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
                {posts.map((post) => (
                  <Box rounded={"lg"} my={3} h={70} backgroundColor={"gray.300"}>
                    <HStack space={3}>
                      <Image
                        roundedTopLeft={"lg"}
                        roundedBottomLeft={"lg"}
                        w={70}
                        h={70}
                        alt="music image" 
                        source={{ 
                          uri: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Noir_D%C3%A9sir_-_Des_visages_des_figures.jpg' 
                        }}
                      />
                      <Box w={"full"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Text>{post.name}</Text>
                        <Text>(4:03)</Text>
                      </Box>
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