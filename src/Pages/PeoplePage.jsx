import { Await, useNavigate } from "react-router-dom";
import PeopleService from "../Services/PeopleService";
import { useEffect, useState } from "react";
import PeopleCard from "../Components.jsx/PeopleCard";
import Pagination from 'react-bootstrap/Pagination';


const PeoplePage = () => {

    const [Actor, setActor] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage,setMaxPage] = useState(500);

    const fetchAllPeople = async () => {
        try {
            const response = await PeopleService.getAllPeople(currentPage);
            console.log(response.data.results);
            setActor(response.data.results);
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                  });
            },50)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchAllPeople()
    },[currentPage]);
    
    return<>
    <h1>Acteurs</h1>
    <div className="d-flex justify-content-center flex-wrap gap-3">
    {Actor.map((Actor) => {
          return <PeopleCard PeopleCard={Actor} key={Actor.id}></PeopleCard>
    })}
    </div>

    <Pagination className="d-flex justify-content-center mt-5 gap-1">
        {currentPage > 1 && <>
      <Pagination.First onClick={() => {setCurrentPage(1)}}/>
      <Pagination.Prev onClick={() => {setCurrentPage(currentPage-1)}}/>
      <Pagination.Item onClick={() => {setCurrentPage(1)}}>{1}</Pagination.Item>
      
    </>}
    {currentPage -5 > 0 && <>
    <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage-5)}}/></>}
    
    {(currentPage != 2 && currentPage > 1)&& <>
      <Pagination.Item>{currentPage - 1}</Pagination.Item>
      </>}

      <Pagination.Item active>{currentPage}</Pagination.Item>

        {currentPage + 1 < maxPage && <>
        <Pagination.Item onClick={() => {setCurrentPage(currentPage+1)}}>{currentPage + 1}</Pagination.Item>
        </>}
        {currentPage +5 <= maxPage && <>
        <Pagination.Ellipsis onClick={() => {setCurrentPage(currentPage+5)}}/></>}

      {currentPage < maxPage && <>
      <Pagination.Item onClick={() => {setCurrentPage(maxPage)}}>{maxPage}</Pagination.Item>
      <Pagination.Next onClick={() => {setCurrentPage(currentPage+1)}}/>
      <Pagination.Last onClick={() => {setCurrentPage(maxPage)}}/>
      </>}

    </Pagination>
    </>;
    
}
 
export default PeoplePage;