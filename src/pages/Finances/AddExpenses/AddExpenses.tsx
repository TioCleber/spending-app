import { useEffect, useState } from 'react'
import { useModal } from '../../../hooks/useModal'
import { useAxios } from '../../../hooks/useAxios'
import { useService } from '../../../hooks/useService'

import { CircularProgress } from '@mui/material'
import { Add } from '@mui/icons-material'
import { InputText } from '../../../components/Inputs/InputText'
import ModalCustom from '../../../components/Modal/Modal'
import SelectCustom from '../../../components/Select/Select'

import './../../../styles/add.css'

interface Expenses {
  name: string
  institution: string
  value: number
  date: string
  category?: string
}

interface Categories {
  expensesCategories: AllCategories[]
  spendingCategories: AllCategories[]
}

interface AllCategories {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const INITIAL_VALUE = {
  name: '',
  institution: '',
  value: 0,
  date: '',
}

const AddExpenses = () => {
  const { handleOpenModal, open } = useModal()
  const { post, get, loading, error, success } = useAxios()
  const { url, headers } = useService()
  const [expenses, setExpenses] = useState<Expenses>(INITIAL_VALUE)
  const [categories, setCategories] = useState<Categories>()

  const handleClick = () => {
    const body = {
      name: expenses.name,
      date: new Date(expenses.date).toISOString(),
      institution: expenses.institution,
      value: Number(expenses.value),
      category: expenses.category,
    }

    post({ url: `${url}v1/pvt/expenses`, headers, body })
  }

  useEffect(() => {
    // get({ url: `${url}v1/pvt/categories`, headers, data: setCategories })
  }, [])

  const categoriesName = categories?.expensesCategories.map(
    (category) => category.name
  )

  return (
    <>
      <button onClick={handleOpenModal} className="button button-add">
        <Add />
      </button>

      <ModalCustom open={open} handleOpenModal={handleOpenModal}>
        <section className="add-record">
          <aside className="input-groups">
            <InputText
              label="Nome"
              name="name"
              setState={setExpenses}
              state={expenses}
              value={expenses?.name}
            />

            <InputText
              label="Instituição"
              name="institution"
              setState={setExpenses}
              state={expenses}
              value={expenses.institution}
            />
          </aside>

          <aside className="input-groups">
            <InputText
              label="Data"
              name="date"
              setState={setExpenses}
              state={expenses}
              value={expenses.date}
            />

            <InputText
              label="Valor"
              name="value"
              setState={setExpenses}
              state={expenses}
              value={expenses.value}
            />
          </aside>

          <aside className="categories">
            <InputText
              label="Categoria"
              name="category"
              setState={setExpenses}
              state={expenses}
              value={expenses.category}
            />

            <SelectCustom
              name="category"
              setState={() => {}}
              state={expenses}
              value={''}
              label="Categoria"
              values={categoriesName ?? []}
            />
          </aside>

          <aside className="container-buttons">
            <button onClick={handleOpenModal} className="button button-cancel">
              cancelar
            </button>

            <button onClick={handleClick} className="button button-submit">
              {loading ? (
                <CircularProgress
                  style={{ width: 24, height: 24 }}
                  className="loading"
                />
              ) : (
                'Adicionar'
              )}
            </button>
          </aside>
        </section>
      </ModalCustom>
    </>
  )
}

export default AddExpenses