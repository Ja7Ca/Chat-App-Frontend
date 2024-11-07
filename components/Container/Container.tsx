const Container = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <div className="w-max-[64em] w-[90%] mx-auto">
            {children}
        </div>
    );
}

export default Container;
