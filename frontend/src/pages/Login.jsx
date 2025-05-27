import React, { useState } from 'react'

function Login() {
  const [currentState, setCurrentState] = useState('Sign up');
 
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
  }


  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col items-center w-[90%] sm:max-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {currentState === 'Login' ? '' : <input type="text" className='w-full max-w-xs px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input type="email" className='w-full max-w-xs px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" className='w-full max-w-xs px-3 py-2 border border-gray-800' placeholder='Password' required/>
      
      {/* Forgot password link - only shown in Login mode */}
      {currentState === 'Login' && (
        <div className='w-full max-w-xs text-right'>
          <p className='cursor-pointer text-sm'>Forgot your password?</p>
        </div>
      )}
      
      {/* Submit button */}
      <button 
        type="submit" 
        className='w-full max-w-xs px-3 py-2 bg-gray-800 text-white mt-4'
      >
        {currentState === 'Login' ? 'Login' : 'Sign up'}
      </button>
      
      {/* Toggle between Login and Sign up */}
      <p className='text-sm mt-2'>
        {currentState === 'Login' 
          ? "Don't have an account? " 
          : "Already have an account? "}
        <span 
          className='cursor-pointer underline' 
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign up' : 'Login')}
        >
          {currentState === 'Login' ? 'Sign up' : 'Login'}
        </span>
      </p>
    </form>
  )
}

export default Login