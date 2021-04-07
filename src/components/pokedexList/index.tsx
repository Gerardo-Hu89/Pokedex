import React, { useState, useEffect, ReactElement } from 'react';
import { Row, Col, Button, Table } from 'antd';
import { capitalizeFirstLetter } from 'utils/misc';
import './styles.css';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text:string) => <a>{text}</a>,
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Types',
    dataIndex: 'types',
    key: 'types',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (text:string) => <img alt="" src={text}/>,
  }
];

const PokemonTable = ({obj}: any): ReactElement => {
  const [data, setData] = useState();

  useEffect(() => {
    const data = obj.map((el:any, i:number) => {
      console.log(el);
      return {
        key: i,
        weight: el.weight,
        height: el.height,
        image: el.sprites.front_default,
        name: capitalizeFirstLetter(el.name),
        types: el.types.map((el:any, i:number) => capitalizeFirstLetter(el.type.name, i)).toString()
      }
    });
    setData(data);
  }, [obj]);

  return (
    <Table pagination={false} columns={columns} dataSource={data} />
  );
};

const PokedexList: React.FC<any> = (): ReactElement => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    (async function () {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${limit}`);
      const { results } = await response.json();
      const statsSrc = [];
      for(const el of results) {
        statsSrc.push((await fetch(`https://pokeapi.co/api/v2/pokemon/${el.name}`)).json());
      };
      const statsArr = await Promise.all(statsSrc);
      setData(statsArr);
    })();
    return () => {};
  }, [page, limit]);

  return (
    <>
      <Row>
        <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
          {data && <PokemonTable obj={data} />}
        </Col>
      </Row>
      <Row>
        <Col style={{paddingTop:'25px', textAlign:'right'}} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Button onClick={() => setPage(page-10)}>Prev</Button>
          <Button onClick={() => setPage(page+10)}>Next</Button>
        </Col>  
      </Row>
    </>
  );
};

export default PokedexList;