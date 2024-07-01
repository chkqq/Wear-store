import styles from './style.module.scss'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface PriceData {
  date: string
  price: number
}

interface PriceChartProps {
  data: PriceData[]
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  return (
    <div className={styles.priceChartBox}>
      <h2 className={styles.title}>История изменения цены</h2>
      <LineChart  width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#333333" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  )
}

export default PriceChart
