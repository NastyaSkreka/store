import React, { useEffect , useState} from 'react'

import {useParams} from 'react-router-dom'
import { useGetProductsQuery} from "../../features/api/apiSlice"

import Products from "../Products/Products"

import styles from "../../styles/Category.module.css"
import { useSelector } from 'react-redux'

function Category() {
    const { id } = useParams();
    const {list} = useSelector(({categories}) => categories)

    const defaultValues = {
        title: "", 
        price_min: 0, 
        pcice_max: 0,
    }

    const defaultParams = {
        categoryId: id, 
        limit: 5, 
        offset: 0, 
        ...defaultValues
    }

    const [cat, setCat] = useState(null)
    const [isEnd, setEnd] = useState(false)
    const [items, setItems] = useState([])
    const [params, setParams] = useState(defaultParams)
    const [values, setValues] = useState(defaultValues);

    const {data = [], isLoading, isSuccess} = useGetProductsQuery(params)

    useEffect(() => {
        if(!id) return;

        setValues(defaultValues)
        setItems([])
        setEnd(false)
        setParams({...defaultParams,  categoryId: id})
    }, [id])

    useEffect(() => {
        if(!id || !list.length) return;

        const category = list.find((item) => item.id === id * 1) // * (number)
        setCat(category)
    }, [list, id])

    useEffect(() => {
        if (isLoading) return;
    
        if (!data.length) return setEnd(true);
    
        setItems((_items) => [..._items, ...data]);
    }, [data, isLoading]);
  

    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e) => {
       e.preventDefault();

       setItems([])
       setEnd(false)
     
       setParams({...defaultParams, ...values});
    } 
    
    const handleReset = () => {
        setParams(defaultParams)
        setValues(defaultValues)
        setEnd(false)
    }
 
  return(
    <section className={styles.wrapper}>
        <h2 className={styles.title}>{cat?.name}</h2>

        <form className={styles.filters} onSubmit={handleSubmit}>
            <div className={styles.filter}>
                <input type="text" 
                    name="title"
                    placeholder='Product name'
                    onChange={handleChange}
                    value={values.title}
                />
                <span>Price from</span>
            </div>
            <div className={styles.filter}>
                <input type="number" 
                    name="price_min"
                    placeholder="0"
                    onChange={handleChange}
                    value={values.price_min}
                />
            </div>
            <div className={styles.filter}>
                <input type="number" 
                    name="price_max"
                    placeholder="0"
                    onChange={handleChange}
                    value={values.price_max}
                />
                  <span>Price to</span>
            </div>

            <button type="submit" hidden/>
        </form>

        {isLoading ? (
            <div className="preloader">Loading...</div>
        ) : !isSuccess || !items.length ? (
            <div className={styles.back}>
                <span>No results</span>
                <button onClick={handleReset}>Reset</button>
            </div>
        ): (
            <Products title="" products={items} style={{padding:0}} amount={items.length}/>
        )}
     {
        !isEnd &&  <div className={styles.more}>
                        <button 
                            onClick={() => setParams({...params, offset: params.offset + params.limit})}
                        >Show more</button>
                    </div>
     }
    </section>
  )
}
export default Category