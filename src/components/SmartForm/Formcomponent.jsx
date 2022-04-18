import React from "react";
import { useForm } from "react-hook-form";


import styles from './styles.css'

export function Form({ defaultValues, children, onSubmit }) {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name
                  }
                })
              : child;
          })
        : children}
    </form>
  );
}

export function Input({ register, placeholder, name, ...rest }) {
  return <input className={styles.input} placeholder={placeholder} {...register(name)} {...rest} />;
}

export function Select({ register, placeholder, options, name, ...rest }) {
  return (
    <select className={styles.select} placeholder={placeholder} {...register(name)} {...rest}>
      {options.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
}
