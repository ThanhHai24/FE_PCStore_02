/**
 * CKEditor5 - Reusable rich text editor component
 * Based on CKEditor 5 Builder configuration
 * https://ckeditor.com/ckeditor-5/builder/
 */

import { useState, useMemo } from 'react';
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';

const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODc2MTU5OTksImp0aSI6Ijc5YWZmZWFjLWUzNmMtNDc1Yi05NTBiLWVmOWE1YjE2ZTMwOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijc0Y2U5YjRhIn0.H6zCT52rcoKSP-jfaZRibqKeV8RKe7_SndDCSb7Q995nJnj1r4Eu9Kx-0Yr2fFXO6mDsT9OWifYPiwDuIwGlwg';

interface CKEditor5Props {
    /** Current HTML value */
    value?: string;
    /** Called with new HTML string on every change */
    onChange?: (html: string) => void;
    /** Placeholder text shown when editor is empty */
    placeholder?: string;
    /** Minimum height of the editing area (CSS value, e.g. "150px") */
    minHeight?: string;
}

export default function CKEditor5Component({
    value = '',
    onChange,
    placeholder = 'Nhập nội dung tại đây...',
    minHeight = '150px',
}: CKEditor5Props) {
    const [isLayoutReady] = useState(true);
    // Capture the initial value only once via lazy state initialization
    const [initialData] = useState(() => value);
    const cloud = useCKEditorCloud({ version: '48.4.0' });


    const { ClassicEditor, editorConfig } = useMemo(() => {
        if (cloud.status !== 'success' || !isLayoutReady) {
            return {};
        }

        const {
            ClassicEditor,
            Autosave,
            Essentials,
            Paragraph,
            LinkImage,
            Link,
            ImageBlock,
            ImageToolbar,
            BlockQuote,
            Bold,
            CloudServices,
            ImageUpload,
            ImageInsertViaUrl,
            AutoImage,
            Table,
            TableToolbar,
            Mention,
            Heading,
            ImageTextAlternative,
            ImageCaption,
            ImageStyle,
            Indent,
            IndentBlock,
            ImageInline,
            Italic,
            List,
            MediaEmbed,
            MediaEmbedStyle,
            MediaEmbedToolbar,
            TableCaption,
            TodoList,
            Underline,
            ImageUtils,
            ImageEditing,
            TextTransformation,
            Autoformat,
            Emoji,
            Fullscreen,
            HorizontalLine,
            Alignment,
            Style,
            GeneralHtmlSupport,
            PlainTableOutput,
        } = cloud.CKEditor;

        return {
            ClassicEditor,
            editorConfig: {
                toolbar: {
                    items: [
                        'undo',
                        'redo',
                        '|',
                        'fullscreen',
                        '|',
                        'heading',
                        'style',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'emoji',
                        'horizontalLine',
                        'link',
                        'insertImageViaUrl',
                        'mediaEmbed',
                        'insertTable',
                        'blockQuote',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent',
                    ],
                    shouldNotGroupWhenFull: false,
                },
                plugins: [
                    Alignment,
                    Autoformat,
                    AutoImage,
                    Autosave,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Emoji,
                    Essentials,
                    Fullscreen,
                    GeneralHtmlSupport,
                    Heading,
                    HorizontalLine,
                    ImageBlock,
                    ImageCaption,
                    ImageEditing,
                    ImageInline,
                    ImageInsertViaUrl,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    ImageUtils,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    MediaEmbed,
                    MediaEmbedStyle,
                    MediaEmbedToolbar,
                    Mention,
                    Paragraph,
                    PlainTableOutput,
                    Style,
                    Table,
                    TableCaption,
                    TableToolbar,
                    TextTransformation,
                    TodoList,
                    Underline,
                ],
                placeholder,
                licenseKey: LICENSE_KEY,
                autosave: {},
                fullscreen: {
                    onEnterCallback: (container: HTMLElement) =>
                        container.classList.add(
                            'editor-container',
                            'editor-container_classic-editor',
                            'editor-container_include-style',
                            'editor-container_include-fullscreen',
                            'main-container'
                        ),
                },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                    ],
                },
                htmlSupport: {
                    allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }],
                },
                image: {
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                    ],
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual' as const,
                            label: 'Downloadable',
                            attributes: { download: 'file' },
                        },
                    },
                },
                mediaEmbed: {
                    toolbar: ['mediaEmbed:breakText', 'mediaEmbed:wrapText'],
                },
                mention: {
                    feeds: [{ marker: '@', feed: [] }],
                },
                menuBar: { isVisible: true },
                style: {
                    definitions: [
                        { name: 'Article category', element: 'h3', classes: ['category'] },
                        { name: 'Title', element: 'h2', classes: ['document-title'] },
                        { name: 'Subtitle', element: 'h3', classes: ['document-subtitle'] },
                        { name: 'Info box', element: 'p', classes: ['info-box'] },
                        { name: 'CTA Link Primary', element: 'a', classes: ['button', 'button--green'] },
                        { name: 'CTA Link Secondary', element: 'a', classes: ['button', 'button--black'] },
                        { name: 'Marker', element: 'span', classes: ['marker'] },
                        { name: 'Spoiler', element: 'span', classes: ['spoiler'] },
                    ],
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                },
            },
        };
    }, [cloud, isLayoutReady, placeholder]);

    if (!ClassicEditor || !editorConfig) {
        return (
            <div
                style={{ minHeight }}
                className="flex items-center justify-center border border-gray-200 rounded-xl bg-gray-50 text-xs text-gray-400 gap-2"
            >
                <svg className="animate-spin w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Đang tải trình soạn thảo...
            </div>
        );
    }

    return (
        <div className="ck-editor-wrapper">
            <style>{`
                .ck-editor-wrapper .ck-editor__editable {
                    min-height: ${minHeight};
                    font-size: 13px;
                }
                .ck-editor-wrapper .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
                    border-color: #e5e7eb;
                }
                .ck-editor-wrapper .ck.ck-toolbar {
                    border-radius: 12px 12px 0 0 !important;
                    border-color: #e5e7eb !important;
                    background: #f9fafb !important;
                }
                .ck-editor-wrapper .ck.ck-editor__main > .ck-editor__editable {
                    border-radius: 0 0 12px 12px !important;
                    border-color: #e5e7eb !important;
                }
                .ck-editor-wrapper .ck.ck-editor__main > .ck-editor__editable.ck-focused {
                    border-color: #3b82f6 !important;
                    box-shadow: 0 0 0 2px rgba(59,130,246,0.2) !important;
                }
            `}</style>
            <CKEditor
                editor={ClassicEditor}
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                config={editorConfig as any}
                data={initialData}
                onReady={(editor) => {

                    console.log('CKEditor ready:', editor);
                    editor.editing.view.focus();
                }}
                onChange={(_event, editor) => {
                    const data = editor.getData();
                    console.log('CKEditor data:', data);
                    onChange?.(data);
                }}
            />
        </div>
    );
}
