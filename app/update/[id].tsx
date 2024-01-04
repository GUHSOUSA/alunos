import { View, Text, Alert, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useGlobalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAluno = () => {

    // se voce for no index vai ve que no botao atualizar tem um <link href"item.id ou aluno.id"> isso quer dizer que ele vai enviar esse id dele
    // percebeu que o nome desse arquivo tem id? ele capitura esse id. eu pesquiso se tem algo no banco de dados igual esse id.
    // se  tiver eu mostro todas informaçoes sobre ele
    // e meu butao atuallizar e a mesma coisa





    const {id} = useGlobalSearchParams();
    const [nome, setNome] = useState('');
    const [idade, setidade] = useState('');
    const [nota1, setnota1] = useState('');
    const [nota2, setnota2] = useState('');
    const getAlunoData = async () => {
        try {
            const alunosString = await AsyncStorage.getItem('alunos');
            const alunos = alunosString ? JSON.parse(alunosString) : [];
            const aluno = alunos.find((aluno: { id: string | string[]; }) => aluno.id === id);
            setNome(aluno.nome);
            setidade(aluno.idade);
            setnota1(aluno.nota1);
            setnota2(aluno.nota2);
        } catch (error) {
            Alert.alert("erro ao obter os dados do aluno");
        }
    }
    useEffect(() => {
        getAlunoData();
    }, []);
    const updateAluno = async () => {
        try {
           const alunosString = await AsyncStorage.getItem('alunos');
           const alunos = alunosString ? JSON.parse(alunosString) : [];
           const updatedAlunos = alunos.map((aluno: { id: string | string[]; }) => aluno.id === id ? { ...aluno, nome, idade, nota1, nota2 } : aluno);
           await AsyncStorage.setItem('alunos', JSON.stringify(updatedAlunos));
           Alert.alert('Aluno atualizado com sucesso');
           router.replace('/')
        } catch (error) {
           Alert.alert("erro ao atualizar aluno");
        } finally {
        }
       }
  return (
    <SafeAreaView>
      <Text>User Id {id}</Text>

      <Text>Nome</Text>
      <TextInput 
        placeholder="Nome" 
        className='bg-slate-300 p-2 rounded-sm my-2'

        onChangeText={setNome}
        value={nome}
      />
      <Text>Idade</Text>
      <TextInput 
        placeholder="Idade" 
        className='bg-slate-300 p-2 rounded-sm my-2'
        keyboardType='numeric'
        onChangeText={setidade}
        value={idade}
      />
      <Text>Nota 1</Text>
      <TextInput 
        placeholder="Nota 1"
        className='bg-slate-300 p-2 rounded-sm my-2'
        keyboardType='numeric'
        onChangeText={setnota1}
        value={nota1}
      />
      <Text>Nota 2</Text>
      <TextInput 
        placeholder="Nota 2 "
        className='bg-slate-300 p-2 rounded-sm my-2'
        keyboardType='numeric'
        onChangeText={setnota2}
        value={nota2}
      />
      <Button 
        title="Atualizar aluno" 
        onPress={updateAluno}
      />
    </SafeAreaView>
  )
}

export default UpdateAluno