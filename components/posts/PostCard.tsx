import { HStack, Box, Image, Text, VStack } from 'native-base';
import moment from 'moment';

interface Props {
  post: any;
}

export const PostCard: React.FC<Props> = ({ post }: Props) => {
  return (
    <Box rounded={'lg'} my={3} h={100} backgroundColor={'gray.200'}>
      <HStack>
        <Image
          roundedTopLeft={'lg'}
          roundedBottomLeft={'lg'}
          w={100}
          h={100}
          alt="music image"
          source={{
            uri: post.music?.music?.image,
          }}
        />
        <VStack mx={3} flex={1} justifyContent={'space-between'}>
          <HStack
            w={'full'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontSize={'lg'} fontWeight={'bold'}>
              {post.music?.music?.name}
            </Text>
            <Text>(4:03)</Text>
          </HStack>
          <Box>
            <Text>{post.music?.music?.artist}</Text>
          </Box>
          <Box>
            <Text>{post.mood?.emojie}</Text>
          </Box>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text>Posted on {moment(post.created_at).format('D MMMM')}</Text>
            <Text>{post.like_count} 🤍</Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};
