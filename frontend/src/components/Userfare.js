import React from 'react'
function Userfare(props) {
  return (
    <div>
    <br />
    <div className="container-sm" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "700px" }}>
      <h1 align="center" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Fare Details</h1>
      <br />
      <br />
    </div>
    <div className="container-sm table-responsive" style={{ backgroundColor: props.mode === 'dark' ? '#495057' : 'white', maxWidth: "700px", maxHeight: "400px" }}>
      <table className={`table table-striped ${props.mode === 'dark' ? 'table-dark' : ''} table-hover table-bordered`}>
        <thead>
          <tr>
            <th scope="col">Sl No.</th>
            <th scope="col">Distance {`(KM)`}</th>
            <th scope="col">Fare {`(RS)`}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>0 - 2</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>2 - 5</td>
            <td>10</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>5 - 10</td>
            <td>15</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>10 - 20</td>
            <td>20</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>20 - 30</td>
            <td>25</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>30 - 40</td>
            <td>30</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>40 - 50</td>
            <td>35</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>More than 50</td>
            <td>40</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <br />
  </div>
  )
}

export default Userfare
