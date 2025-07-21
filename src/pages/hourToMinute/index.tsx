import MenuPage from '../menu'



function Index() {

  return (

    <div>
      <MenuPage />
      <div style={ { marginLeft: '256px', padding: '20px' } }>
        <h1>Horas para minutos</h1>
        <label >
          Digite a quantidade de horas:
          <input type="text" />
        </label>


      </div>
    </div>
  )
}

export default Index
