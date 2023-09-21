import { useEffect, useState } from 'react'
import Navbar from './navbar'
import axios from 'axios'
import '../styles/home.css'
import { closestCenter, DndContext,
MouseSensor,
useSensor,
useSensors,
TouchSensor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';


const SortableUser = ({ user }) => {
  const { attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: user.id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div ref={setNodeRef} {...attributes} style={style} {...listeners} className="card w-80 bg-base-100 shadow-xl mt-[6rem] mx-[2rem] cursor-pointer">
        <figure><img src={user?.src.original} alt={user.alt} /></figure>
        <div className="card-body">
            <h2 className="card-title">
                {user.photographer}
            </h2>
        </div>
    </div>
  )
}

const Home = () => {
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const mouse = useSensor(MouseSensor),
    touch = useSensor(TouchSensor,{
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    })
    const sensors = useSensors(mouse, touch)

    useEffect(() => {
        const baseUrl = 'https://api.pexels.com/v1/'
        const headers = {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        }
        axios.get(`${baseUrl}curated?per_page=1&per_page=50`, {headers})
         .then(res => {
                setImages(res.data.photos)
                setLoading(false)
         }).catch(err => {
            setLoading(false)
         })

    }, [])

    if (loading) {
        return <span className="loading loading-spinner md:loading-md loading-sm lg:loading-lg"></span>
    }

    
    const handleSearch = (searchQuery) => {
      setLoading(true)
      if (searchQuery) {
        // Filter images based on the search query
        const filteredImages = images.filter((image) =>
        image.photographer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        {filteredImages ? setImages(filteredImages) : setImages(images)}
      }
      setLoading(false);
    }

    const onDragEnd = (event) => {
       const { active, over } = event
       if(active.id === over.id) return
       setImages((images) => {
           const oldIndex = images.findIndex((image) => image.id === active.id)
           const newIndex = images.findIndex((image) => image.id === over.id)
           return arrayMove(images, oldIndex, newIndex)
       })
    }

    
  return (
    <div>
      <Navbar onSearch={handleSearch} />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
            <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={onDragEnd}>
              <SortableContext items={images} strategy={rectSortingStrategy}>
                  {images.map((imageUrl) => (
                      <SortableUser key={imageUrl.id} user={imageUrl} />
                  ))}
              </SortableContext>
            </DndContext>
          </div>
    </div>
  )
}

export default Home
