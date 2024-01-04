import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EvilIcons, AntDesign } from '@expo/vector-icons';

// esse são os types, seu codigo tambem funciona sem isso. mas essa e a diferença de typescript pra jascript ele tem o auto completar que ajuda muito

type Alunos = {
    id: string;
    nome: string;
    nota1: number;
    nota2: number;
    idade: string;
};



const index = () => {
    // o searchinput recebe tudo que eu coloco no pesquisar aluno
    const [searchInput, setSearchInput] = useState('');

    // aqui eu armazeno tudo que o meu useefect carrega quando eu abro p celular
    const [alunos, setAlunos] = useState<Alunos[]>([])

    // essa lista so e carrecaga depois que o aluno e carregado, pq ela vai filtrar os alunos
    const [filteredAlunos, setFilteredAlunos] = useState<Alunos[]>([]);


    // esse e o use efect principal ele observa todos os dados que ta salvo localmente e tras pra mim
    useEffect(() => {
        const fetchData = async () => {
            const result = await AsyncStorage.getItem('alunos');
            const data = result ? JSON.parse(result) : [];
            setAlunos(data);
            setFilteredAlunos(data);
        };
        fetchData();
    }, [])


    // aqui e onde voce pode alterar o codigo na parte que pediu de pesquisar por id. se quiser pesquisar por nome so mudar o aluno.id pra aluno.nome
    useEffect(() => {
        const filtered = alunos.filter(aluno => aluno.id.toLowerCase().includes(searchInput.toLowerCase()));
        setFilteredAlunos(filtered);
    }, [searchInput]);


    // essa funçao recebe uma string id, que e passada do flatlist que recebeu daquele fechdata e quando encontra a string que recebeu e a string que ele ja tem armazena 
    // ele cria outra lista mas sem o id qwue voce apagou
    const deleteAluno = async (id: string) => {
        try {
            const updatedAlunos = alunos.filter(aluno => aluno.id !== id)
            await AsyncStorage.setItem('alunos', JSON.stringify(updatedAlunos))
            setAlunos(updatedAlunos)
        } catch (error) {
            Alert.alert("erro ao adicionar aluno")
        } 
    }

    // os dados foram criados como string e isso passa eles pro numero se nao voce teria um 6 + 6 = 66 kkk

    const calculateAverage = (aluno: Alunos): number => {
        const nota1 = parseInt(aluno.nota1.toString())
        const nota2 = parseInt(aluno.nota2.toString())
        return (nota1 + nota2);
    };


    return (
        <SafeAreaView>
            <View className='flex p-4'>
                <View className='flex justify-between flex-row items-center'>
                    <Text className='text-black font-bold'>Alunos</Text>
                    <View className='h-10 px-4 rounded-md bg-blue-400 items-center justify-center'>
                        <Link href="/add"><Text className='font-bold text-white'>Adicionar aluno</Text></Link>
                    </View>
                </View>
            </View>
            <TextInput
                className='border border-gray-400 p-2 rounded-md mx-4 mt-4'
                placeholder='Pesquisar aluno...'
                value={searchInput}
                onChangeText={text => setSearchInput(text)}
            />
            <FlatList
                data={filteredAlunos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity className='px-4 py-2 gap-y-4 justify-between items-start flex flex-row'>
                        <View className='flex-row flex '>
                            <View className='rounded-md h-14 w-14 bg-blue-300 items-center justify-center'>
                                <Text className='font-bold text-white text-2xl'>
                                    A
                                </Text>
                            </View>
                            <View className='flex-col flex px-2'>
                                <Text className='text-black '>
                                    {item.nome}
                                </Text>
                                <Text className='text-black '>
                                    Id: {item.id}
                                </Text>
                                <Text className='text-black'>
                                    Idade: {item.idade}
                                </Text>
                                <View className='flex flex-row gap-x-2'>
                                    <Text>
                                        Nota 1: {item.nota1}
                                    </Text>
                                    <Text>
                                        Nota 2: {item.nota2}
                                    </Text>

                                    <Text>
                                        Nota final: {calculateAverage(item)}
                                    </Text>

                                </View>
                            </View>
                        </View>
                        <View className='flex flex-row gap-x-2'>
                            <Link href={`/update/${item.id}`} asChild><TouchableOpacity className='h-10 w-10 bg-yellow-500 flex flex-row rounded-sm items-center justify-center' onPress={() => { }}>
                                <AntDesign name="edit" size={30} color="white" />
                            </TouchableOpacity></Link>
                            <TouchableOpacity className='h-10 w-10 bg-red-500 rounded-sm items-center justify-center' onPress={() => deleteAluno(item.id)}>
                                <EvilIcons name='trash' size={35} color="white" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView>
    )
}

export default index