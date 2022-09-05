import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as C from './App.styles';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddItem'
import api from './services/api';

const App = () => {

  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  const handleAddTask = (description: string) => {
    const data = {
      description: description,
      category: "1",
      completed: false,
      favorited: false,
    };
    api.post("tasks", data).then(res => { console.log(res.data) }).catch(e => { console.log(e) })
  }

  const handleTaskChange = (id: string, description: string, completed: boolean, favorited: boolean) => {
    const data = {
      description,
      completed,
      favorited
    }
    api.put("tasks/" + id, data).then(res => { console.log(res.data) }).catch(e => { console.log(e) })
  }

  useEffect(() => {
    api.get("tasks").then(({ data }) => {
      setList(data);
    })
    setCount(list.filter(item => item.completed === true).length);
  }, [handleAddTask]);

  return (
    <C.Container>
      <C.Area>
        <C.Header>Lista de Tarefas</C.Header>

        <AddArea onEnter={handleAddTask} />

        {list
          .filter(item => item.completed === false)
          .map((item, index) => (
            <ListItem
              key={index}
              item={item}
              onChange={handleTaskChange}
            ></ListItem>

          ))}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Concluídas ({count})</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} variant={'body2'}>
              {list
                .filter(item => item.completed === true)
                .map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    onChange={handleTaskChange}
                  ></ListItem>
                ))
              }
            </Typography>
          </AccordionDetails>
        </Accordion>
      </C.Area>
    </C.Container>
  )
}

export default App;