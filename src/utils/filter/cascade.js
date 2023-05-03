import province from '@assets/json/province.json'
import city from '@assets/json/city.json'
import area from '@assets/json/area.json'
import street from '@assets/json/street.json'

export const filterProvince = () => {
    const list = []
    province.forEach(item => list.push({value: item.id, label: item.name, children: filterCity(item.id)}))
    return list
}
const filterCity = (pid) => {
    const list = []
    city.forEach(i=>{console.log(i)})
    // city.filter(item => item.pid === pid)
    //     .forEach(item => list.push({value: item.id, label: item.name, children:null}))
    return list
}
const filterArea = (pid) => {
    const list = []
    area.filter(item => item.pid === pid)
        .forEach(item => list.push({value: item.id, label: item.name, children: filterStreet(item.id)}))
    return list
}
const filterStreet = (pid) => {
    const list = []
    street.filter(item => item.pid === pid)
          .forEach(item => list.push({value: item.id, label: item.name, children: null}))
    return list
}
