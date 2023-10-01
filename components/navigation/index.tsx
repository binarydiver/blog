type NavigationProps = {
  title: string;
};

const Navigation = (props: NavigationProps) => {
  const { title } = props;

  return (
    <nav className="p-4 text-center border-b">
      <h1 className="text-3xl">{title}</h1>
    </nav>
  );
};

export default Navigation;
