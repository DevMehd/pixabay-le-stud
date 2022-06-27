import './App.css';
import './css/style.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [value1, setValue] = useState("");
  const handleChange = event => {
    setValue(event.target.value)
  };

  const queryParams = new URLSearchParams(window.location.search)
  ;
  const value = queryParams.get('search');

  const [Imgitem, initImg] = useState([])
  const gethits=async()=>
  { const response = await fetch("https://pixabay.com/api/?key=28252518-e176560693fb07a2228ad3b23&lang=fr&per_page=6&q="+ value)
    return  response.json()
  }

  useEffect(() => {
    gethits()
      .then((res) => {
        initImg(res.hits)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  return (
    <div className="App">

      <div>
        <form class="">
                <input class="m-50 placeholder:italic placeholder:text-slate-400 block bg-white w-9/12 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm mb-4 ml-8 mt-2" placeholder="Search for anything..." type="text" name="search" onChange={handleChange} value={value1}/>
        </form>
      </div>

      <script src="theme.js"></script>
      <div class="m-100">
        <table class="border-collapse border border-slate-900 ml-12">
          <thead>
            <tr>
              <th class="border border-slate-600">Résultats :</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Imgitem.map((imgg, idx) => {
                const imggurl = imgg.webformatURL
                const pixurl = imgg.pageURL
                return(
                  <th key={idx} class="border border-slate-700 w-52" >
                    <a href={pixurl}><img src={imggurl} alt="" class=""></img></a>
                  </th>
              )})}
            </tr>
          </tbody>
        </table>
      </div>  
    </div>
  );
}

export default App;
