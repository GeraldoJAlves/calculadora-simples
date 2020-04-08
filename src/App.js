
import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Button from './components/Button'
import Display from './components/Display'

const App = () => {

  const [displayValue, setDisplayValue] = useState(0)
  const [current, setCurrent] = useState(0)
  const [values, setValues] = useState([0, 0])
  const [operation, setOperation] = useState(null)
  const [clearDisplay, setClearDisplay] = useState(false)

  const addDigit = n => {
    if (n == '.' && displayValue.includes('.')) return

    let newValue = displayValue
    if (displayValue == '0' || clearDisplay) {
      newValue = n
    } else {
      newValue += n
    }

    if (n !== '.') {
      let newArray = [...values]
      newArray[current] = parseFloat(newValue)
      setValues(newArray)

    }
    setDisplayValue(newValue)
    setClearDisplay(false)
  }

  const addOperation = o => {
    if (operation) {
      calculate()
    }
    setCurrent(1)
    setOperation(o)
    setClearDisplay(true)
  }

  const calculate = () => {
    let resultado = 0
    if (!operation) {
      return;
    }
    let [firstValue, secondValue] = values
    switch (operation) {
      case 'x':
        resultado = firstValue * secondValue
        break
      case '/':
        resultado = firstValue / secondValue
        break
      case '+':
        resultado = firstValue + secondValue
        break
      case '-':
        resultado = firstValue - secondValue
        break
      default:
        return
    }
    resultado = parseFloat(resultado.toFixed(4))
    clearValue()
    setValues([resultado, 0])
    setClearDisplay(true)
    setDisplayValue(resultado.toString())
  }

  const clearValue = () => {
    setOperation(null)
    setCurrent(0)
    setValues([0, 0])
    setDisplayValue('0')
    setClearDisplay(false)
  }

  return (
    <View style={styles.body}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' onClick={clearValue} />
        <Button label='+/-' />
        <Button label='%' />
        <Button label='/' operation onClick={addOperation} />
        <Button label='7' onClick={addDigit} />
        <Button label='8' onClick={addDigit} />
        <Button label='9' onClick={addDigit} />
        <Button label='x' operation onClick={addOperation} />
        <Button label='4' onClick={addDigit} />
        <Button label='5' onClick={addDigit} />
        <Button label='6' onClick={addDigit} />
        <Button label='-' operation onClick={addOperation} />
        <Button label='1' onClick={addDigit} />
        <Button label='2' onClick={addDigit} />
        <Button label='3' onClick={addDigit} />
        <Button label='+' operation onClick={addOperation} />
        <Button label='0' double onClick={addDigit} />
        <Button label='.' onClick={addDigit} />
        <Button label='=' operation onClick={(x) => calculate()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default App;
