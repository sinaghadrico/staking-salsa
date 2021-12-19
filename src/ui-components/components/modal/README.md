# Usage

```sh
import { Modal } from 'ui-components'

      <button onClick={() => setOpen(true)}>open modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>modal title</h2>
        <p>content</p>
        <footer>footer</footer>
      </Modal>

```
