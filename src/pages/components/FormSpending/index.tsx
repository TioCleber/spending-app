import { useState } from 'react'

import { Input } from '../../../components/Inputs/Input'
import { InputCurrencyValue } from '../../../components/Inputs/InputCurrencyValue'
import { Select } from '../../../components/Select'
import { months } from '../../../constants/months'
import type { Spending } from '../../../typings/FormSpending'
import { formatCurrency } from '../../../utils/formatCurrency'

interface FormSpendingProps {
  refetch?: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormSpending = ({ refetch }: FormSpendingProps) => {
  const [state, setState] = useState<Record<string, string>>({})
  const [month, setMonth] = useState('')
  const [spendingIndex, setSpendingIndex] = useState([0])

  const handleClick = () => {
    setSpendingIndex((oldSpending) => [...oldSpending, oldSpending.length])
  }

  const handleRemove = (index: number) => {
    setSpendingIndex(() => spendingIndex.filter((item) => item !== index))
  }

  const handleSpending = (spendingIndex: number[]) => {
    const spending: Spending[] = []

    spendingIndex.forEach((item) => {
      if (state[`spending_${item}`] && state[`value_${item}`]) {
        spending.push({
          name: state[`spending_${item}`],
          value: state[`value_${item}`],
          extra_money: state['extra_money'] || '0',
        })
      }
    })

    return localStorage.setItem(month, JSON.stringify(spending))
  }

  return (
    <main>
      <section>
        <Select selected={month} setValue={setMonth} values={months} />
      </section>

      {month &&
        spendingIndex.map((item, index) => (
          <section key={index}>
            <Input
              name={`spending_${item}`}
              label={'Nome do Gasto: '}
              state={state}
              setState={setState}
              value={state[`spending_${item}`]}
            />

            <InputCurrencyValue
              name={`value_${item}`}
              label={'Valor gasto: '}
              state={state}
              setState={setState}
              value={formatCurrency(Number(state[`value_${item}`]))}
            />

            {spendingIndex.length > 1 && (
              <button onClick={() => handleRemove(item)}>Remove</button>
            )}

            {month && index === spendingIndex.length - 1 && (
              <button onClick={handleClick}>+</button>
            )}
          </section>
        ))}

      {month && (
        <InputCurrencyValue
          name={`extra_money`}
          label={'Dinheiro extra: '}
          state={state}
          setState={setState}
          value={formatCurrency(Number(state[`extra_money`]))}
        />
      )}

      {state.spending_0 && state.value_0 && (
        <button
          onClick={() => {
            handleSpending(spendingIndex)
            refetch && refetch((oldRefetch) => !oldRefetch)
          }}
        >
          Adicionar
        </button>
      )}
    </main>
  )
}
