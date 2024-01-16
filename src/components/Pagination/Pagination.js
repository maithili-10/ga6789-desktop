import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import prev from '../../assets/ChessPage/Previous.png';
import next from '../../assets/ChessPage/Next.png'

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: "10px",
  display: 'flex',
});

export default function Pagination() {
  const { items } = usePagination({
    count: 10,
  });
// console.log(items)
  return (
    <nav>
      <List style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = <span style={{color:"#FBEFAB"}}>......</span>;
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                  padding:"8px 12px 9px 13px",
                  borderRadius:"7px",
                  border:"none",
                  fontSize:"20px",
                  background:selected?' transparent linear-gradient(180deg, #FBEFAB 0%, #FFEB70 100%)':'#161822',
                  color:selected?'#161822':'#FBEFAB'
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button type="button" {...item}  style={{
                fontWeight: selected ? 'bold' : undefined,
                padding:"8px",
                borderRadius:"7px",
                border:"none",
                width:"135px",
                height:"37px",
                background:"#161822",
                color:"#FBEFAB",
                textTransform:"capitalize",
                border:"1px solid #FBEFAB",
                fontSize:"18px",
              }}>
            {type=='previous'&&<img src={prev} alt="prev"/>}    {type} {type=='next'&&<img src={next} alt="next"/>}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}