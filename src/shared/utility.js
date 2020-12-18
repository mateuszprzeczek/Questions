export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    };
};

export const withEither = (conditionalRenderingFn, EitherComponent) => (
    Component
) => (props) =>
    conditionalRenderingFn(props) ? (
        <EitherComponent />
    ) : (
        <Component {...props} />
    );

const withMaybe = (conditionalRenderingFn) => (Component) => (props) =>
    conditionalRenderingFn(props) ? null : <Component {...props} />;
