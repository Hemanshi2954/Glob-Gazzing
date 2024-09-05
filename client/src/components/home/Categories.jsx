import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled, TableContainer , Paper } from '@mui/material';
//import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

//navu
const StyledTableContainer = styled(TableContainer)`
  margin: 1px auto;
  width: 85%;
  max-width: 600px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

//navu
const StyledTableCell = styled(TableCell)`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9fc5e8;
    color: white;
  }
`;

const StyledTableHeadCell = styled(StyledTableCell)`
  background-color: #114292;
  color: white;
  text-transform: uppercase;

  &:hover {
    background-color: #9fc5e8;
    color: white;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f1f1f1;
  }
`;

////

const StyledButton = styled(Button)`
    margin: 20px;
    width: 80%;
    background: #114292;
    color: #fff;
    text-decoration: none;
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained"
                  sx={{ backgroundColor: '#114292' , transition: 'transform 0.3s ease, background-color 0.3s ease' ,'&:hover': { backgroundColor: '#9fc5e8',  transform: 'scale(1.05)'}   }}>Create Blog</StyledButton>
            </Link>
    <StyledTableContainer component = {Paper}>
                <StyledTable>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableHeadCell>
                                <StyledLink to={"/"}>
                                    All Categories
                                </StyledLink>
                            </StyledTableHeadCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categories.map(category => (
                                <StyledTableRow key={category.id}>
                                    <StyledTableCell>
                                        <StyledLink to={`/?category=${category.type}`}>
                                            {category.type}
                                        </StyledLink>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </StyledTable>
    </StyledTableContainer>
            
        </>
    )
}
//styletablecontainer big outer mosttag
//TABLEROW -> <Styled.
//styletableheadcel from tablcell
//aftercategory map tablerow to styletablerow and also for cell 
export default Categories;