# Java Spring Boot and React Application

This application is a simple project that demonstrates the integration of a Java Spring Boot backend service with a React frontend.

## Backend Setup (Java Spring Boot)

1. Create a new Spring Boot project (using [Spring Initializr](https://start.spring.io/) or your preferred method).
2. Add the following dependencies: Spring Web and Spring Boot DevTools.
3. Create a new controller class named `HelloController.java` inside your project's main package.

```java
package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from Spring!";
    }
}
```

To enable CORS for the entire application, create a configuration class named MyConfiguration.java in your project's main package.

```java
package com.example.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*");
    }
}
```

Run your Spring Boot application. The server will start on http://localhost:8080.


## Frontend Setup (React)
Create a new React application using Create React App or your preferred method.
Replace the contents of App.js with the following:

```javascript

import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    greeting: ''
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(message => {
        this.setState({greeting: message});
      })
      .catch(e => {
        console.log('There was a problem with your fetch operation: ' + e.message);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.greeting}</h1>
        </header>
      </div>
    );
  }
}

export default App;

```
Run your React application. The server will start on http://localhost:3000.

Now, when you navigate to http://localhost:3000, you should see the greeting message from the Spring Boot application displayed on the page.