import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, matchPath } from 'react-router-dom'
import './App.css';
import Highlight from 'react-highlight'

import 'bootstrap/dist/css/bootstrap.css'
import 'highlight.js/styles/monokai.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="navbar navbar-light navbar-toggleable-md bg-faded">
            <div className="container">
              <span className="navbar-brand">React Router v4 examples</span>
              
              <nav className="navbar-nav">
                <Link to="/" className="nav-item nav-link">
                  Main
                </Link>
                <Link to="/location" className="nav-item nav-link">
                  Location
                </Link>
                <Link to="/match" className="nav-item nav-link">
                  Match
                </Link>
                <Link to="/history" className="nav-item nav-link">
                  History
                </Link>
                <Link to="/404" className="nav-item nav-link">
                  Switch and Not Found
                </Link>
                <Link to="/modal" className="nav-item nav-link">
                  Modals
                </Link>
                <Link to="/matchpath" className="nav-item nav-link">
                  matchPath
                </Link>
              </nav>
            </div>
          </div>

          <div className="container">
            <Switch>
              <Route path="/" exact component={Main}/>
              <Route path="/location" component={Location}/>
              <Route path="/match/:someParam?" component={Match}/>
              <Route path="/history" component={History}/>
              <Route path="/404" component={NotFound}/>
              <Route path="/modal" component={Modal}/>
              <Route path="/matchpath" component={MatchPath}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// I put everything in one file because I'm lazy
// Sorry!

const Main = function Main({ location, match, history }) {
  return (
    <div>
      <p>
        React-router v4 can be explained in simplest term as:
      </p>
      
      <p className="lead">
        You wrap your pages or parts of the application in components called &lt;Route/&gt;
        that render (or not) based on the current URL.
      </p>
      
      <p>
        You can control what's being rendered by &lt;Route/&gt; with either of these three props
        (they are mutually exclusive):
      </p>
      
      <ul>
        <li>
          <strong>component</strong> - most commonly used, renders passed component when URL matches.
          The way it works makes it impossible to pass your own props without creating another wrapping component
          (e.g. you can't do <code>{`component={&lt;MyComponent prop=&quot;123&quot;&gt;}`}</code>).
          If you need to do this you can use
        </li>
        <li>
          <strong>render</strong> - accepts a function that must return a valid React component.
          This is used mostly in two cases: when you want to pass custom props or when you want to create
          a HOC that will wrap your route with additional logic (like transitions)
        </li>
        <li>
          <strong>children</strong> - similar to runs the function even when the path does not match.
          When it matches, <code>match</code> prop will contain proper Match object (more on that later),
          when it doesn't, <code>match</code> is <code>null</code>. Useful for animations and placeholders.
        </li>
      </ul>
      
      <p>
        You can control what path is matched and how by using <code>path</code>, <code>exact</code> and <code>strict</code>.
      </p>
      
      <ul>
        <li>
          <strong>path</strong> - uses <a href="https://github.com/pillarjs/path-to-regexp">path-to-regexp</a> underneath
          so you can check out their documentation to see everything that is possible with it. The simplest case is
          either a normal path (e.g. <code>/foo/bar</code>) or a path with named params
          (e.g. <code>/foo/:someParam</code>) or optional named params (e.g. <code>/foo/:optionalParam?</code>.
          Those params are then accessible using <code>match</code> prop.
        </li>
        <li>
          <strong>exact</strong> - normally all params are matched from the left, for example when you
          have a &lt;Route/&gt; that matches to <code>/foo</code>, it will also match to <code>/foo/bar</code>,
          <code>/foo/bar/baz</code> etc. This can be unwanted behaviour if for example we want to match
          to a root path (<code>/</code>) so you can disable it with this prop.
        </li>
        <li>
          <strong>strict</strong> - normally trailing slashes are ignored when matching a path, so
          <code>/foo</code> is the same as <code>/foo/</code>. If for some reason this is an unwanted behaviour,
          you can disable it by setting this prop.
        </li>
      </ul>
      
      <p>
        Every time you mount a React component using <code>&lt;Route/&gt;</code>,
        it passes three props: <Link to="/location">location</Link>
        , <Link to="/match">match</Link> and <Link to="/history">history</Link>
      </p>
    </div>
  )
}

const Location = function Location({ location }) {
  return (
    <div>
      <p>Location contains five properties:</p>
  
      <ul>
        <li>
          <strong>key</strong> - unique key for every path or routing, can be used to detect location change
        </li>
        <li>
          <strong>hash</strong> - location hash (everything after <code>#</code>)
        </li>
        <li>
          <strong>pathname</strong> - location path
        </li>
        <li>
          <strong>search</strong> - GET params (everything after <code>?</code> but before <code>#</code>)
        </li>
        <li>
          <strong>state</strong> - state that was passed when transitioning (more about that in History section)
        </li>
      </ul>
  
      <p>
        This is how current location prop looks like:
      </p>
  
      <Highlight>
        {JSON.stringify(location, null, "  ")}
      </Highlight>
  
      <p>
        Now test out these links and see what happens:
      </p>
  
      <p>
        <Link className="btn btn-outline-primary" to="/location#foo">Foo</Link>
        <Link className="btn btn-outline-secondary" to="/location?bar">Bar</Link>
        <Link className="btn btn-outline-success" to="/location?baz#qux">Baz</Link>
      </p>
    </div>
  )
}


const Match = function Match({ match }) {
  return (
    <div>
      <p>
        This components shows two of the most powerful features in React Router: matching params
        and matching routing from left to right.
      </p>
  
      <p>
        Match object, basically "how it happened that this Route was rendered" is being passed as prop.
        It can contain matched parameters from routing.
      </p>
      
      <p>
        This is how current match prop looks like:
      </p>
      
      <Highlight>
        {JSON.stringify(match, null, "  ")}
      </Highlight>
      
      <p>
        Now test out these links and see what happens:
      </p>
      
      <p>
        <Link className="btn btn-outline-primary" to="/match/foo">Foo</Link>
        <Link className="btn btn-outline-secondary" to="/match/bar">Bar</Link>
        <Link className="btn btn-outline-success" to="/match/baz">Baz</Link>
      </p>
      
      <Route path="/match/foo" render={() => <p>This text only shows on Foo page</p>}/>
      <Route path="/match/bar" render={() => <p>This text only shows on Bar page</p>}/>
      <Route path="/match/:something" render={({ match }) => (
        <p>This text shows on every subpage, even {match.params.something}</p>
      )}/>
    </div>
  )
}

const History = function History({ history }) {
  return (
    <div>
      <p>
        History is an object that is used when creating initial &lt;Router&gt;. It handles
        history changes (moving around application). All the other navigational components
        (like &lt;Link&gt;) use it underneath.
      </p>
      
      <p>
        The implementation of History object differs depending on the environment. In browser
        it users browser's History API, in Node and Native it uses it's own in-memory implementation.
        There is also third implementation that uses shebangs (<code>#</code>), it was necessary when
        we had to support browsers without History API but it's no longer necessary or used.
      </p>
  
      <Highlight>
        {JSON.stringify(history, null, "  ")}
      </Highlight>

      <p>
        Other than the properties above, <code>history</code> prop also passes six important methods:
      </p>
      
      <ul>
        <li>
          <strong>push(path, [state])</strong> - pushes a new entry to history stack, this is used by
          &lt;Link&gt; and is what you want to do most of the time when moving inside app.
          It can also pass additional state that can be used after transition, it's then available
          in <code>location.state</code>.
        </li>
        <li>
          <strong>replace(path, [state])</strong> - replaces an entry in history stack. The difference
          between this and push is that you cannot use <code>back()</code> (or browser Back button)
          to go to the previous page.
        </li>
        <li>
          <strong>go(n)</strong> - moves the pointer by <code>n</code> in history stack. You can use it
          to go back or forward more than once if it's necessary. This is not used as much as you'd imagine,
          because:
        </li>
        <li>
          <strong>goBack()</strong> - is the equivalent of <code>go(-1)</code> and
        </li>
        <li>
          <strong>goForward()</strong> - is the quivalent of <code>go(1)</code>
        </li>
        <li>
          <strong>block(prompt)</strong> - prevents the navigation by displaying a prompt and letting
          user decide if they want to navigate out or not. Useful when there's something still happening
          in the background. Other than a string, you can also pass a function that will get
          <code>location</code> (where we want to go) and <code>action</code> (how we want to go there).
          <br/><br/>
          Unfortunately due to recent changes in browsers (security!), value of the <code>prompt</code> is being
          ignored and a generic "Are you sure you want to quit" popup is being shown instead.
        </li>
      </ul>
      
      <p>
        Demo:<br/>
  
        <span className="btn btn-outline-primary" onClick={() => history.goBack()}>
          Go back
        </span>
        {' '}
        <Link className="btn btn-outline-secondary" to={`/history/${Math.ceil(Math.random() * 1000)}`}>
          Click here to go to random page
        </Link>
        {' '}
        <span className="btn btn-outline-primary" onClick={() => history.goForward()}>
          Go forward
        </span>
      </p>
    </div>
  )
}


const NotFound = function() {
  return (
    <div>
      <p>
        When you have a set of components that react to different paths and you want to make sure
        you are only rendering one of them (because it's your application's main routing for example),
        you can use <code>&lt;Switch/&gt;</code>. It goes through every <code>&lt;Route/&gt;</code> inside and renders the
        first that matches the path.
      </p>
      <p>
        This feature is also useful to implement 404 Not Found page. You create your main routing
        in your application and add catch-all (without <code>path</code> specified) routing at the end.
      </p>
      <p>
        Demo:
      </p>
      <Switch>
        <Route path="/404" exact render={() => <p>Click on one of the buttons below</p>}/>
        <Route path="/404/a" render={() => <p>A</p>}/>
        <Route path="/404/b" render={() => <p>B</p>}/>
        <Route render={() => <p>Page does not exist</p>}/>
      </Switch>
      <p>
        <Link to="/404/a" className="btn btn-outline-primary">A</Link>
        {' '}
        <Link to="/404/b" className="btn btn-outline-primary">B</Link>
        {' '}
        <Link to="/404/c" className="btn btn-outline-primary">C</Link>
      </p>
    </div>
  )
}

const SomeModal = function ({ history }) {
  const onClick = () => history.length === 0 ? history.push('/modal') : history.goBack()
  return (
    <div>
      <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">This is modal!</div>
            <div className="modal-body">
              <p>Lorem ipsum!</p>
            </div>
            <div className="modal-footer">
              <span className="btn btn-outline-danger" onClick={onClick}>
                Click to close
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"/>
    </div>
  )
}

const Modal = function() {
  return (
    <div>
      <p>
        Because react-router v4 is dynamic, you can create modals with their own URL.
        This approach is much better than the usual "show modal on click" because it allows
        user to come back easily, link to the modal itself and it's also healthy for SEO.
      </p>
      
      <p>
        In this case we're using an absolutely positioned <code>&lt;div/&gt;</code> but you
        can use something else like <code>react-overlays</code> or <code>react-bootstrap</code> instead.
      </p>
      
      <p>
        <Link className="btn btn-outline-primary" to="/modal/open">Click to open modal</Link>
      </p>
      
      <Route path="/modal/open" component={SomeModal}/>
    </div>
  )
}


const MatchPath = function MatchPath({ location }) {
  const A = matchPath(location.pathname, { path: '/matchpath' })
  const B = matchPath(location.pathname, { path: '/:someParam' })
  const C = matchPath(location.pathname, { path: '/matchpath/:param' })
  const D = matchPath(location.pathname, { path: '/matchpath/:param?' })
  
  return (
    <div>
      <p>
        If you need to do something more advanced and need to use the same matching logic
        as the underlying <code>&lt;Route/&gt;</code> or <code>&lt;Link/&gt;</code> components,
        you can use a function called <code>matchPath</code>.
      </p>
      <p>
        <code>matchPath</code> acceps two arguments. The first is the location you want to match against.
        This may or may not be current <code>location.pathname</code>, depending on what you need.
        The other is an object containing three keys: <code>path</code>, <code>strict</code> and <code>exact</code>.
      </p>
      <Highlight>{`
const A = matchPath(location.pathname, { path: '/matchpath' })
const B = matchPath(location.pathname, { path: '/:someParam' })
const C = matchPath(location.pathname, { path: '/matchpath/:param' })
const D = matchPath(location.pathname, { path: '/matchpath/:param?' })
      `.trim()}</Highlight>
      
      <p>
        The above code will result in:
      </p>
      
      <Highlight>{`
A == ${JSON.stringify(A, null, '  ')}

B == ${JSON.stringify(B, null, '  ')}

C == ${JSON.stringify(C, null, '  ')}

D == ${JSON.stringify(D, null, '  ')}
      `.trim()}</Highlight>
    </div>
  )
}














export default App;
