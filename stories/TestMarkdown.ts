export const text = `# Complete Markdown Demo

This comprehensive demo showcases **FlowToken**'s capabilities with various markdown elements and real-world patterns.

![霧に包まれた山頂](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## Basic Text Formatting

Regular text with *italic*, **bold**, and ***bold italic*** formatting. You can also use ~~strikethrough~~ text and \`inline code\` snippets.

Create hyperlinks like [FlowToken on GitHub](https://github.com/Backless-AI/flowtoken) and [OpenAI](https://www.openai.com).

---

## Image Gallery Testing

### Beautiful Nature Photography

Here are some stunning landscape images to test FlowToken's image animation capabilities:

![日中の穏やかな空](https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

### Single Landscape Image

![アイスランドの壮大な風景](https://images.unsplash.com/photo-1482784160316-6eb046863ece?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

### Fallback Test Images

If external images fail to load, these should work:

![Test Image 1](https://placehold.co/600x300/2563eb/ffffff?text=FlowToken+Gallery+1) ![Test Image 2](https://placehold.co/600x300/059669/ffffff?text=FlowToken+Gallery+2)

---

## Lists and Code Testing

### Ordered List with Code Block
1. **Install Dependencies**  
   Run \`npm install @flowtoken/core\` to get started

2. **Setup Configuration**  
   Create a \`.env\` file with your settings:
   \`\`\`env
   API_KEY=your-api-key-here
   MODEL=gpt-4
   TEMPERATURE=0.7
   \`\`\`

3. **Initialize the Client**  
   Import and configure your FlowToken instance

4. **Start Streaming**
   Begin your streaming session with the configured client

### Unordered List without Code
- **Text Animation Types**
  - \`fadeIn\` - Smooth opacity transition
  - \`slideInFromLeft\` - Horizontal slide animation
  - \`bounceIn\` - Playful bounce effect

- **Advanced Features**
  - Custom component integration
  - Real-time streaming support
  - Multiple animation types
  - TypeScript support

---

## Simple Code Example (Outside Lists)

Basic usage example:

\`\`\`typescript
import { FlowToken } from '@flowtoken/core';

const client = new FlowToken({
  apiKey: process.env.API_KEY,
  model: 'gpt-4'
});
\`\`\`

---

## Tables and Data Visualization

### Feature Comparison

| Feature | FlowToken | Standard Markdown | Other Libraries |
|---------|-----------|------------------|-----------------|
| **Streaming Support** | ✅ Built-in | ❌ No | ⚠️ Limited |
| **Animations** | ✅ 12+ types | ❌ None | ⚠️ Basic |
| **TypeScript** | ✅ Full support | ✅ Yes | ⚠️ Partial |
| **React Integration** | ✅ Native | ❌ Manual | ✅ Yes |
| **Custom Components** | ✅ Advanced | ❌ No | ⚠️ Basic |
| **Performance** | ✅ Optimized | ✅ Fast | ⚠️ Variable |
| **Bundle Size** | ✅ Small | ✅ Minimal | ❌ Large |

### Performance Metrics

| Animation Type | Render Time | Memory Usage | Compatibility | Rating |
|---------------|-------------|--------------|---------------|---------|
| \`fadeIn\` | ~2ms | Low | 99% | ⭐⭐⭐⭐⭐ |
| \`slideInFromLeft\` | ~3ms | Low | 98% | ⭐⭐⭐⭐⭐ |
| \`bounceIn\` | ~4ms | Medium | 95% | ⭐⭐⭐⭐ |
| \`wave\` | ~5ms | Medium | 94% | ⭐⭐⭐⭐ |
| \`dropIn\` | ~3ms | Low | 97% | ⭐⭐⭐⭐⭐ |

### Browser Support Matrix

| Browser | Version | Support Level | Notes |
|---------|---------|---------------|-------|
| **Chrome** | 90+ | ✅ Full | Recommended |
| **Firefox** | 88+ | ✅ Full | All features work |
| **Safari** | 14+ | ⚠️ Partial | Some animations limited |
| **Edge** | 90+ | ✅ Full | Chromium-based |
| **IE** | Any | ❌ None | Not supported |

---

## Blockquotes and Callouts

> **Note**: FlowToken is designed for modern web applications that require smooth, animated text rendering during real-time content streaming.

> **Warning**: Always ensure your API keys are properly secured and never exposed in client-side code.

### Important Callouts

> 💡 **Pro Tip**: Use \`animation="none"\` on completed messages to reduce memory usage and improve performance.

> 🚨 **Breaking Change**: Version 2.0 introduces new animation timing controls. Update your implementations accordingly.

> 📚 **Documentation**: For complete API reference, visit our [documentation site](https://docs.flowtoken.dev).

> 🎯 **Best Practice**: Always test animations on lower-end devices to ensure smooth performance across all user experiences.

> 🔒 **Security**: Implement proper rate limiting and input validation when handling streaming content from external sources.

### Multi-line Blockquotes

> **Getting Started Guide**
> 
> FlowToken makes it easy to add beautiful animations to your markdown content. Start by installing the package, configuring your preferred animation settings, and then simply wrap your content with the AnimatedMarkdown component.
> 
> The library handles all the complex timing and rendering optimizations automatically, so you can focus on creating great user experiences.

> **Performance Considerations**
> 
> When working with large amounts of streaming content, consider these optimization strategies:
> - Use \`animation="none"\` for completed messages
> - Implement virtual scrolling for long conversations
> - Debounce rapid updates to prevent performance degradation
> - Monitor memory usage in production environments

---

## Advanced Quote Patterns

### Nested Quotes

> **Main Quote**: This is the primary quote content.
> 
> > **Nested Quote**: This is a quote within a quote, often used for citations or emphasis.
> > 
> > > **Deep Nested**: Even deeper nesting for complex documentation structures.

### Different Quote Types

> ℹ️ **Information**: General information and helpful hints for users.

> ⚠️ **Warning**: Important warnings about potential issues or limitations.

> ❌ **Error**: Critical errors that need immediate attention.

> ✅ **Success**: Confirmation messages and successful operation indicators.

> 🔧 **Configuration**: Setup and configuration instructions.

---

## Task Lists and Progress

### Development Roadmap
- [x] ✅ Basic text animation
- [x] ✅ Markdown parsing
- [x] ✅ React integration
- [x] ✅ TypeScript support
- [x] ✅ Storybook documentation
- [ ] 🔄 Vue.js support (In Progress)
- [ ] 📋 Angular integration (Planned)
- [ ] 🎨 Custom theme system (Roadmap)
- [ ] 🌐 Multi-language support (Future)
- [ ] 📱 Mobile optimizations (Future)

### Testing Checklist
- [x] Unit tests for core functions
- [x] Integration tests for React components
- [ ] E2E tests for streaming scenarios
- [ ] Performance benchmarks
- [ ] Accessibility compliance testing
- [ ] Cross-browser compatibility tests

---

## Final Tables

### Pricing Comparison

| Plan | Features | Price | Animations | Support |
|------|----------|-------|------------|---------|
| **Free** | Basic animations, Limited usage | $0/month | 5 types | Community |
| **Pro** | All animations, Unlimited usage | $29/month | 12+ types | Email |
| **Enterprise** | Custom animations, Priority support | $199/month | Unlimited | Phone + Email |

### Release History

| Version | Release Date | Major Features | Breaking Changes |
|---------|--------------|----------------|------------------|
| v1.0.0 | 2024-01-15 | Initial release | N/A |
| v1.1.0 | 2024-02-20 | Added bounce animations | None |
| v1.2.0 | 2024-03-10 | TypeScript improvements | None |
| v2.0.0 | 2024-04-05 | Complete rewrite | Yes - API changes |

---

## Final Notes

**FlowToken** provides a comprehensive solution for animated markdown rendering in streaming applications. This demo showcases tables, blockquotes, and essential patterns for testing.

### Key Testing Areas

1. **Image Rendering** - Beautiful Unsplash photography with animations
2. **Table Rendering** - Multiple table formats and complexities
3. **Blockquote Styling** - Various quote types and nesting levels  
4. **List Integration** - Mixed content with and without code
5. **Typography Consistency** - Heading hierarchy and text formatting

> 🎉 **Congratulations**: You've explored all the key features of FlowToken's markdown rendering capabilities!

---

*Thank you for exploring FlowToken! 🚀*`;
