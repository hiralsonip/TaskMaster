type HomeTaskProp = {
    title: string;
    description: string;
    className: string;
}

const HomeTask: React.FC<HomeTaskProp> = ({ title, description, className }: HomeTaskProp) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div >
    )
}

export default HomeTask
