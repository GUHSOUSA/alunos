import { Alert, Button, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// de novo os types pra ajudar 
type Aluno = {
    id: string;
    nome: string;
    idade: string;
    nota1: string;
    nota2: string;
};

const Add: React.FC = () => {
    const [nome, setNome] = useState('');
    const [idade, setidade] = useState('');
    const [nota1, setnota1] = useState('');
    const [nota2, setnota2] = useState('');
    

    const registrarAluno = async () => {

      // aqui criei uma data com os campos 
        const aluno: Aluno = {
            id: Math.random().toString(),
            nome,
            idade,
            nota1,
            nota2
        };

        // e salvei no asyncStorage
        try{
        const alunoId = await AsyncStorage.getItem('alunos');
        const alunos = alunoId ? JSON.parse(alunoId): []
        alunos.push(aluno);
        await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
        Alert.alert("Aluno cadastrado")
        router.replace('/')
        }catch (error){
            Alert.alert("Erro Ao adicionar aluno")
        }
      }
      

    return (
        <SafeAreaView className='px-4'>
          <Text className='text-2xl font-bold mb-10 mt-4'>
            Adicionar alunos
          </Text>
             <TextInput
        className='bg-slate-300 p-2 rounded-sm my-2'
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />
      
      <TextInput
        className='bg-slate-300 p-2 rounded-sm my-2'
        placeholder="Idade"
        value={idade}
        keyboardType='numeric'
        onChangeText={setidade}
      />
      <TextInput
        className='bg-slate-300 p-2 rounded-sm my-2'
        placeholder="Nota 1"
        keyboardType='numeric'
        value={nota1}
        onChangeText={setnota1}
      />
      <TextInput
        className='bg-slate-300 p-2 rounded-sm my-2'
        placeholder="Nota 2"
        value={nota2}
        keyboardType='numeric'

        onChangeText={setnota2}
      />
      
           <Button title='Cadastrar' onPress={registrarAluno}/>
        </SafeAreaView>
    )
}

export default Add