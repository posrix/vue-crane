import styles from './Tip.module.css'
import { on, off } from 'common/utils/dom'

const Tip = {
  props: {
    mode: {
      type: String,
      default: 'static',
      validator: value => ['static', 'dynamic'].indexOf(value) > -1
    },
    className: {
      type: String,
      default: 'default',
      validator: value =>
        ['default', 'success', 'warn', 'error'].indexOf(value) > -1
    },
    content: {
      type: Array,
      require: true
    },
    transition: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      showTip: false
    }
  },
  mounted() {
    !this.isStatic() && this.init()
  },
  methods: {
    init() {
      const reference = this.$refs.reference
      on(reference, 'click', this.toggle)
    },
    destory() {
      const reference = this.$refs.reference
      off(reference, 'click', this.doToggle)
    },
    isStatic() {
      return this.mode === 'static'
    },
    toggle() {
      this.showTip = !this.showTip
    },
    show() {
      this.showTip = true
    },
    close() {
      this.showTip = false
    }
  },
  created() {
    this.isStatic() && this.show()
  },
  render() {
    return (
      <transition name={this.transition}>
        {this.showTip && (
          <div class={[styles[this.className]]}>
            <div class={[styles.contentArea]}>
              {this.content.length === 1 ? (
                this.content[0]
              ) : (
                <ul>
                  {this.content.map((item, index) => (
                    <li key={index} class={[styles.wordBreak]}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {!this.isStatic() && (
              <div class={[styles.closeArea]} on-click={this.close}>
                <i class="el-icon-close" />
              </div>
            )}
          </div>
        )}
      </transition>
    )
  },
  destroyed() {
    !this.isStatic() && this.destory()
  }
}

export default Tip
