

export default (props) => (
    <div className="mobileLayout">
        <header>
            <div>Adjunctus</div>
        </header>
            {props.children}
        <footer>
            <div>
                <a href="https://github.com/unstoo" target="_blank">
                    repostiroy
                </a>
            </div>
        </footer>
    </div>
)