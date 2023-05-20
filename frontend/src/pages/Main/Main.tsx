import React from 'react';
import {
    Container,
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Center,
} from '@chakra-ui/react';
import StressImage from '../../assets/stress.png';
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()
    return (
        <Container maxW='7xl'>
            <Stack
                align={'center'}
                spacing={{base: 8, md: 10}}
                py={{base: 6, md: 8}}
                direction={{base: 'column', md: 'row'}}>
                <Stack flex={1} spacing={{base: 5, md: 10}}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{base: '4xl', sm: '4xl', lg: '6xl'}}>
                        <Text
                            as={'span'}>
                            Write once,
                        </Text>
                        <br/>
                        <Text as={'span'} color={'brand.400'}>
                            use everywhere!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Snippy is a rich coding snippets app that lets you create your own
                        code snippets, categorize them, and even sync them in the cloud so
                        you can use them anywhere. All that is free!
                    </Text>
                    <Stack
                        spacing={{base: 4, sm: 6}}
                        direction={{base: 'column', sm: 'row'}}>
                        <Button
                            position='static'
                            rounded='full'
                            size='lg'
                            fontWeight='medium'
                            px={6}
                            colorScheme='brand'
                            // bg={'brand.400'}
                            _hover={{bg: 'brand.500'}}
                            onClick={() => navigate('/burnout')}>
                            Пройти тест
                        </Button>
                        {/*<Button*/}
                        {/*    position='static'*/}
                        {/*    rounded={'full'}*/}
                        {/*    size={'lg'}*/}
                        {/*    fontWeight={'normal'}*/}
                        {/*    px={6}*/}
                        {/*    leftIcon={<PlayIcon h={4} w={4} color={'gray.300'} />}>*/}
                        {/*    How It Works*/}
                        {/*</Button>*/}
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Center>
                        <Image
                            position='static'
                            alt={'Stress Image'}
                            fit={'cover'}
                            align={'center'}
                            width={{base: '80%', md: '90%'}}
                            height={{base: '80%', md: '90%'}}
                            // height={'100%'}
                            src={StressImage}

                        />
                    </Center>
                </Flex>
            </Stack>
        </Container>
    );
};

export default Main;
