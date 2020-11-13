import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {
  PieChart, Pie, XAxis, Cell, ResponsiveContainer
} from 'recharts';
import Title from './Title';

import api from "../../../services/api";

const COLORS = ['#c2c2c2', '#00C49F', '#FFBB28', '#FF8042'];

export default function ChartPie() {
  const user = localStorage.getItem("session");
  const [transaction, setTransaction] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const loadTransactions = async () => {
      await api.get("/transactionCriptos", {
        headers: {
          Authorization: `${user}`,
        },
      }).then((res) => {
        // console.log(res.data);
        setTransaction(res.data);
      })
      .catch((err) => console.log(err));
    };

    loadTransactions();
  }, []);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <PieChart width={900} height={400}>
          <Pie
            data={transaction}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {
              transaction.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} pointerEvents={index.name}/>
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
